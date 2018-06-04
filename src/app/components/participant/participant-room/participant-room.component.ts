import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {CreateUserComponent} from "../../create-user/create-user.component";

@Component({
  selector: 'app-participant-room',
  templateUrl: './participant-room.component.html',
  styleUrls: ['./participant-room.component.css']
})
export class ParticipantRoomComponent implements OnInit {

  roomId:string;
  tasks:any[];
  taskToEstimate: any;
  estimationResult:any[];
  canEstimate= false;

  constructor(private route: ActivatedRoute, private service:RoomService, public info: MatSnackBar, public  dialog: MatDialog) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.sendToWebSocket({roomId: this.roomId, type: 'init-client'});
    this.fetchTasks();
    this.listenOnWebSockets();
    this.signUp();
  }

  private signUp() {
    setTimeout(() => {
      let ref = this.dialog.open(CreateUserComponent);
      ref.afterClosed().subscribe(
        data => {
          if (data) {
            this.service.setUser(data);
          }
        }
      )
    }, 10);
  }

  private listenOnWebSockets() {
    this.service.websocket.onMessage(
      (msg: MessageEvent) => {
        console.log("onMessage ", msg.data);
        const message = JSON.parse(msg.data);
        const type = message.type;
        if (type == 'task-selected') {
          this.taskToEstimate =message.content;
          this.estimationResult = null;
          this.canEstimate = true;
        } else if (type == 'restart') {
          this.estimationResult = null;
          this.canEstimate = true;
        } else if (type == 'esimation-finish') {
          this.canEstimate = true;
          this.fetchTasks();
        } else if (type == 'new-task') {
          this.fetchTasks();
        } else if (type == 'show') {
          this.estimationResult = message.content.estimate;
        }else if (type == 'end') {
          //TODO end
        }

      },
      {autoApply: false}
    )
  }

  private fetchTasks() {
    this.service.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
      }, error => console.error(error)
    )
  }

  estimateTask(value){
    if(this.canEstimate){
      const initMessage = {roomId: this.roomId, type: 'estimation', content: {estimate: value}};
      this.sendToWebSocket(initMessage);
      this.canEstimate = false;
    }
  }

  sendToWebSocket(message){
    this.service.sendToWebSocket(message);
  }

}
