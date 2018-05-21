import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RoomService} from "../../../services/room.service";
import {MatSnackBar} from "@angular/material";

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

  constructor(private route: ActivatedRoute, private service:RoomService, public info: MatSnackBar) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.getTasks(this.roomId).subscribe(
      data => this.tasks = data,
      error => console.error(error)
    )
    setTimeout(() => this.taskToEstimate = this.tasks[0], 4000);

    //TODO listen on WS to set estimationResult when received
  }

  estimateTask(value){
    this.service.estimateTask(this.taskToEstimate, value).subscribe(
      data => this.info.open("Task estimated!",'',{duration:1000}),
      error => console.error(error)
    )
  }

}
