import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from "@angular/material";
import {Acccount, AccountService} from "../../services/account.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  team: string;
  name: string;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, private account: AccountService, private info: MatSnackBar) {
  }

  ngOnInit() {
  }

  signUp() {
    this.account.singUp(new Acccount(this.username, this.email, this.password, this.team)).subscribe(
      data => this.dialogRef.close(this.email),
      error => this.info.open('Error, please try again later', '', {duration:3000})
    );
  }

  signIn() {
    //TODO sign in using service
    this.dialogRef.close(this.email);
  }

  fastSignIn() {
    this.dialogRef.close(this.name);
  }

}
