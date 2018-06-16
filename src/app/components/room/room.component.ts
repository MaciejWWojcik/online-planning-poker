import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {AccountService} from "../../services/account.service";
import {CreateRoomComponent} from "../create-room/create-room.component";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private router: Router, public account: AccountService) {
  }

  ngOnInit() {
  }

  profile(){
    this.router.navigate(['/profile']);
  }

}
