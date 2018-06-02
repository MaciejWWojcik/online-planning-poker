import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {MatDialog} from "@angular/material";
import {CreateUserComponent} from "../../create-user/create-user.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId: string;
  tasks: any[] = [];
  taskToEstimate: any;
  estimation: number[] = [];
  estimationMedian: number;

  // websocket = new $WebSocket("ws://plpoker-api.azurewebsites.net/websocket");

  constructor(private route: ActivatedRoute, private service: RoomService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.tasks = this.service.tasks;
    this.sendToWebSocket({roomId: this.roomId, type: 'init-host'});
    this.listenOnWebSockets();
    this.signUp()
  }

  private signUp() {
    setTimeout(() => {
      let ref = this.dialog.open(CreateUserComponent);
      ref.afterClosed().subscribe(
        data => {
          if (data) {
            this.service.setHostUser(data);
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

        if (type == 'estimation') {
          this.estimation.push(message.content.estimate);
          this.estimationMedian = this.median(this.estimation);
        }

      },
      {autoApply: false}
    )
  }

  sendToWebSocket(message) {
    this.service.sendToWebSocket(message);
  }

  selectedToEstimate(task) {
    this.taskToEstimate = task;
    const taskMessage = {roomId: this.roomId, type: 'task-selected', content: task};
    this.sendToWebSocket(taskMessage);
  }

  onMenuChange(type: string) {
    const message = {roomId: this.roomId, type: 'end'};
    this.sendToWebSocket(message);
  }

  estimate(estimationResult) {
    if (estimationResult === 'restart') {
      const taskMessage = {roomId: this.roomId, type: 'restart'};
      this.estimation = [];
      this.estimationMedian = 0;
      this.sendToWebSocket(taskMessage);
    } else if (estimationResult === 'show') {
      const taskMessage = {roomId: this.roomId, type: 'show', content: {estimate: this.estimation}};
      this.sendToWebSocket(taskMessage);
    } else {
      const taskMessage = {roomId: this.roomId, type: 'esimation-finish'};
      this.estimation = [];
      this.estimationMedian = 0;
      this.sendToWebSocket(taskMessage);
      this.service.estimateTask(this.taskToEstimate, estimationResult);
      this.taskToEstimate = null;
    }
  }

  private median(values) {
    values.sort(function (a, b) {
      return a - b;
    });

    if (values.length === 0) return 0

    let half = Math.floor(values.length / 2);

    if (values.length % 2)
      return values[half];
    else
      return (values[half - 1] + values[half]) / 2.0;
  }
}
