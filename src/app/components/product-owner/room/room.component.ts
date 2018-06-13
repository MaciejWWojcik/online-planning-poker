import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {$WebSocket} from "angular2-websocket/angular2-websocket";
import {MatDialog} from "@angular/material";
import {CreateUserComponent} from "../../create-user/create-user.component";
import {AccountService} from "../../../services/account.service";
import {EstimateSubmitComponent} from "../../estimate-submit/estimate-submit.component";
import {DiscussionComponent} from "../../discussion/discussion.component";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId: string;
  tasks: any[] = [];
  taskToEstimate: any;
  estimation: string[] = [];
  estimationMedian: number;
  dialogRef;

  constructor(private route: ActivatedRoute, public service: RoomService, public dialog: MatDialog, private router: Router, private account: AccountService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.roomId = this.roomId;
    this.fetchTasks();
    this.service.sendToWebSocket({roomId: this.roomId, type: 'init-host'});
    this.listenOnWebSockets();
    if(!this.account.account){
      this.signUp()
    }else{
      this.setUser();
    }
  }

  private fetchTasks() {
    this.service.getTasks().subscribe(
      (data: any) => {
        this.tasks = data;
        this.service.tasks = data;
        this.tasks.forEach(task => {
          this.service.taskVotes.set(task.id, 0);
        })
      }, error => console.error(error)
    )
  }

  private signUp() {
    setTimeout(() => {
      let ref = this.dialog.open(CreateUserComponent);
      ref.afterClosed().subscribe(
        data => {
          if (data) {
            this.setUser();
          }
        }
      )
    }, 10);
  }

  private setUser() {
    let account = this.account.account;
    if (account.mailAddress) {
      this.service.setHostUser(account.mailAddress, true).subscribe();
    } else {
      this.service.setHostUser(account.username, false).subscribe();
    }
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
        }else if (type == 'chat') {
          this.dialogRef.componentInstance.addMessage(message.content)
        }else if (type == 'vote-for-task'){
          let task = message.content.task;
          let value = this.service.taskVotes.get(task.id);
          this.service.taskVotes.set(task.id, ++value);
          this.changeDetector.detectChanges();
        }

      },
      {autoApply: false}
    )
  }

  selectedToEstimate(task) {
    this.estimation = [];
    this.estimationMedian = 0;
    this.taskToEstimate = task;
    const taskMessage = {roomId: this.roomId, type: 'task-selected', content: task};
    this.service.sendToWebSocket(taskMessage);
  }

  onMenuChange(type: string) {
    const message = {roomId: this.roomId, type: 'end'};
    this.service.sendToWebSocket(message);
    this.router.navigate(['/room/summary',this.roomId]);
  }

  estimate(estimationResult) {
    if (estimationResult === 'restart') {
      this.handleEstimationRestart();
    } else if (estimationResult === 'show') {
      this.handleEstimationShow();
    } else if(estimationResult === 'discuss'){
      this.service.sendToWebSocket({roomId: this.roomId, type: 'discuss', content: {estimate:this.estimation}})

      this.dialogRef = this.dialog.open(DiscussionComponent, {width:'600px', height:'400px'});
      this.dialogRef.componentInstance.estimates = this.estimation;
      this.dialogRef.componentInstance.task = this.taskToEstimate;

    } else {
      this.handleEstimationFinish(estimationResult);
    }
  }

  private handleEstimationShow() {
    const showMessage = {roomId: this.roomId, type: 'show', content: {estimate: this.estimation}};
    this.service.sendToWebSocket(showMessage);
  }

  private handleEstimationRestart() {
    const taskMessage = {roomId: this.roomId, type: 'restart'};
    this.estimation = [];
    this.estimationMedian = 0;
    this.service.sendToWebSocket(taskMessage);
  }

  private handleEstimationFinish(estimationResult) {
    const taskMessage = {roomId: this.roomId, type: 'esimation-finish'};
    this.estimation = [];
    this.estimationMedian = 0;
    this.service.estimateTask(this.taskToEstimate, estimationResult).subscribe(()=>{
      this.fetchTasks();
      this.service.sendToWebSocket(taskMessage);
    });
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
