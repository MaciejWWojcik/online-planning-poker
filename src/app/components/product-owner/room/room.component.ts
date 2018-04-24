import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomId:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
  }

}
