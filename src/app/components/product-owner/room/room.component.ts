import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private service: RoomService, public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.fetchTasks();
    this.sendToWebSocket({roomId: this.roomId, type: 'init-host'});
    this.listenOnWebSockets();
    this.signUp()
  }

  private fetchTasks() {
    this.service.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
        this.service.tasks = data;
      }, error => console.error(error)
    )
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
    this.estimation = [];
    this.estimationMedian = 0;
    this.taskToEstimate = task;
    const taskMessage = {roomId: this.roomId, type: 'task-selected', content: task};
    this.sendToWebSocket(taskMessage);
  }

  onMenuChange(type: string) {
    const message = {roomId: this.roomId, type: 'end'};
    this.sendToWebSocket(message);
    this.router.navigate(['/room/summary',this.roomId]);
  }

  estimate(estimationResult) {
    if (estimationResult === 'restart') {
      this.handleEstimationRestart();
    } else if (estimationResult === 'show') {
      this.handleEstimationShow();
    } else {
      this.handleEstimationFinish(estimationResult);
    }
  }

  private handleEstimationShow() {
    const showMessage = {roomId: this.roomId, type: 'show', content: {estimate: this.estimation}};
    this.sendToWebSocket(showMessage);
  }

  private handleEstimationRestart() {
    const taskMessage = {roomId: this.roomId, type: 'restart'};
    this.estimation = [];
    this.estimationMedian = 0;
    this.sendToWebSocket(taskMessage);
  }

  private handleEstimationFinish(estimationResult) {
    const taskMessage = {roomId: this.roomId, type: 'esimation-finish'};
    this.estimation = [];
    this.estimationMedian = 0;
    this.sendToWebSocket(taskMessage);
    this.service.estimateTask(this.taskToEstimate, estimationResult).subscribe();
    this.fetchTasks();
    this.taskToEstimate = null;
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
