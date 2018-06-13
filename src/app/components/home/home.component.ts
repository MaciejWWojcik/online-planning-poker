import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from "@angular/material";
import {CreateRoomComponent} from "../create-room/create-room.component";
import {Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogged = false;

  constructor(public dialog: MatDialog, public infoBar: MatSnackBar, private router: Router, private account: AccountService) {
  }

  ngOnInit() {
  }

  createRoom() {
    let dialogRef = this.dialog.open(CreateRoomComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.infoBar.open(result, '', {duration: 4000})
    });
  }

  signIn() {
    this.dialog.open(LoginComponent, {position: {top: '10px', right:'10px'}});
  }

  profile(){
    this.router.navigate(['/profile']);
  }
}
