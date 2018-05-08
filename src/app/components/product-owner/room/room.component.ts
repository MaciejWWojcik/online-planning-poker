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
  estimation: string[];

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

    setTimeout(() => this.estimation = ['1','2','1','10'], 1000);
  }

}
