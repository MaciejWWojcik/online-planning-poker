import {Component, OnInit} from '@angular/core';
import {s} from "@angular/core/src/render3";
import {AccountService} from "../../services/account.service";
import {RoomService} from "../../services/room.service";

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit {

  messages: Message[] = [];
  estimates: string[] = [];
  task: any;
  message:string;
  helloMessage = false;

  constructor(private account: AccountService, private rooms: RoomService) {
  }

  ngOnInit() {
  }

  send(){
    if(this.message && this.message.length > 0){
      this.helloMessage = false;
      let message = new Message(this.message, this.account.account.username);
      this.messages.push(message);
      this.rooms.sendToWebSocket({roomId: this.rooms.roomId, type: 'chat', content: {message: message}})
      this.message =''
    }

  }

  public addMessage(message){
    this.messages.push(message);
  }

}

export class Message {
  constructor(public content: string, public sender: string) {
  }
}
