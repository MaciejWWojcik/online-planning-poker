import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {$WebSocket} from "angular2-websocket/angular2-websocket";

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

  websocket = new $WebSocket("ws://plpoker-api.azurewebsites.net:3001");

  constructor(private route: ActivatedRoute, private service: RoomService) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.tasks = this.service.tasks;
    this.sendToWebSocket({roomId: this.roomId, type: 'init-ws'});
    this.listenOnWebSockets();
  }

  private listenOnWebSockets() {
    this.websocket.onMessage(
      (msg: MessageEvent) => {
        console.log("onMessage ", msg.data);
        const type = msg.data.type;

        if (type == 'estimation') {
          this.estimation.push(msg.data.content);
          this.estimationMedian = this.median(this.estimation);
        }

      },
      {autoApply: false}
    )
  }

  sendToWebSocket(message) {
    this.websocket.send(JSON.stringify(message)).subscribe(
      (msg) => {
        console.log("next", msg.data);
      },
      (msg) => {
        console.log("error", msg);
      },
      () => {
        console.log("complete");
      }
    );
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
      this.sendToWebSocket(taskMessage);
    } else if (estimationResult === 'show') {
      const taskMessage = {roomId: this.roomId, type: 'show', content: this.estimation};
      this.sendToWebSocket(taskMessage);
    } else {
      const taskMessage = {roomId: this.roomId, type: 'esimation-finish'};
      this.sendToWebSocket(taskMessage);
      this.service.estimateTask(this.taskToEstimate, estimationResult);
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
