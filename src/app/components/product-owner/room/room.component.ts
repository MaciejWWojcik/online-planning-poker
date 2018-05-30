import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {RoomService} from "../../../services/room.service";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId:string;
  tasks:any[];
  taskToEstimate:any;
  estimation: number[];
  estimationMedian: number;

  constructor(private route: ActivatedRoute, private service:RoomService) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.getTasks(this.roomId).subscribe(
      data => this.tasks = data,
      error => console.error(error)
    )

  }

  selectedToEstimate(task){
    this.taskToEstimate = task;
    this.service.selectTaskToEstimate(task).subscribe(
      ()=> {},
      error => console.error(error)
    )

    //TODO connect with backend and fetch estimations viw WS
    setTimeout(() => this.estimation = [1,2,4,10,8], 1000);
    this.estimationMedian = this.median([1,2,4,10,8])
  }

  estimate(estimationResult){
    if(estimationResult === 'restart'){
      //TODO connect with backend and restart estimation process
    }else{
      //TODO connect with backend and send estimation result and close estimation process
    }
  }

  private median(values){
    values.sort(function(a,b){
      return a-b;
    });

    if(values.length ===0) return 0

    let half = Math.floor(values.length / 2);

    if (values.length % 2)
      return values[half];
    else
      return (values[half - 1] + values[half]) / 2.0;
  }
}
