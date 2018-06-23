import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {CreateUserComponent} from "../../create-user/create-user.component";
import {AccountService} from "../../../services/account.service";
import {DiscussionComponent} from "../../discussion/discussion.component";

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
  dialogRef;
  infoConfig = {duration:3000};
  constructor(private route: ActivatedRoute, private service:RoomService, public info: MatSnackBar, public  dialog: MatDialog, private router: Router, private account: AccountService) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.sendToWebSocket({roomId: this.roomId, type: 'init-client'});
    this.fetchTasks();
    this.listenOnWebSockets();
    this.signUp();
  }

  private signUp() {
    const that = this;
    setTimeout(() => {
      let ref = this.dialog.open(CreateUserComponent);
      ref.afterClosed().subscribe(
        data => {
          let account = that.account.account;
          if (account.mailAddress){
            this.service.setUser(account.mailAddress, true).subscribe();
          }else{
            this.service.setUser(account.username, false).subscribe();
          }
        }
      );
    }, 10);
  }

  private listenOnWebSockets() {
    this.service.websocket.onMessage(
      (msg: MessageEvent) => {
        console.log("onMessage ", msg.data);
        const message = JSON.parse(msg.data);
        const type = message.type;
        if (type == 'task-selected') {
          if(this.dialogRef){
            this.dialog.closeAll();
          }
          this.taskToEstimate =message.content;
          this.estimationResult = null;
          this.canEstimate = true;
          this.info.open('Estimation started', '', this.infoConfig)
        } else if (type == 'restart') {
          if(this.dialogRef){
            this.dialog.closeAll();
          }
          this.estimationResult = null;
          this.canEstimate = true;
          this.info.open('Product Onwer restarted task estimation', '', this.infoConfig)
        } else if (type == 'esimation-finish') {
          if(this.dialogRef){
            this.dialog.closeAll();
          }
          this.canEstimate = false;
          this.fetchTasks();
          this.info.open('Task estimation finished', '', this.infoConfig)
        } else if (type == 'new-task') {
          this.fetchTasks();
        } else if (type == 'show') {
          this.estimationResult = message.content.estimate;
          this.info.open('Product Owner send you estimates', '', this.infoConfig)
          if(this.dialogRef){
            this.dialog.closeAll();
          }
        }else if (type == 'end') {
          this.router.navigate(['/room/summary',this.roomId]);
          this.info.open('End of planning game', '', this.infoConfig)
        }else if (type == 'discussion') {
          this.dialogRef = this.dialog.open(DiscussionComponent, {width:'600px', height:'400px'});
          this.dialogRef.componentInstance.estimates = [];
          message.content.estimates.forEach(estimate => this.dialogRef.componentInstance.estimates.push(estimate.estimate))
          this.dialogRef.componentInstance.task = this.taskToEstimate;
          this.info.open('Product Owner started discussion', '', this.infoConfig)
        }else if (type == 'chat') {
          if(this.dialogRef){
            this.dialogRef.componentInstance.addMessage(message.content.message)
          }
        }else if(type == 'sockets-ready'){
          this.service.socketId = message.socketId;
        }else if(type == 'start-discussion'){
          this.dialogRef.componentInstance.helloMessage = true;
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

  voteForTask(event){
    const message = {roomId: this.roomId, type: 'vote-for-task', content: {task: event}};
    this.service.sendToWebSocket(message);
    this.info.open('Successfully voted for next task to estimate', '', this.infoConfig)
  }

  estimateTask(value){
    if(this.canEstimate){
      const initMessage = {roomId: this.roomId, type: 'estimation', content: {estimate: value}};
      this.sendToWebSocket(initMessage);
      this.canEstimate = false;
      this.info.open('Task estimated successfully', '', this.infoConfig)
    }
  }

  sendToWebSocket(message){
    this.service.sendToWebSocket(message);
  }

}
