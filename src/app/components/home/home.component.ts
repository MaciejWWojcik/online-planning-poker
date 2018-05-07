import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {CreateRoomComponent} from "../create-room/create-room.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public infoBar: MatSnackBar) { }

  ngOnInit() {
  }

  createRoom(){
    let dialogRef = this.dialog.open(CreateRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log("RESULT", result)
      this.infoBar.open(result,'',{duration:4000})
    });
  }
}
