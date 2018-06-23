import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {Account, AccountService} from '../../services/account.service';

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
  infoConfig = {duration: 3000};

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>, private account: AccountService, private info: MatSnackBar) {
  }

  ngOnInit() {
  }

  signUp() {
    const account = new Account(this.username, this.email, this.password, this.team);
    this.account.signUp(account).subscribe(
      data => {
        this.info.open('Registration form submitted', '', this.infoConfig);
        this.account.account = account;
        this.dialogRef.close(this.email);
      },
      error => this.info.open('Error, please try again later', '', this.infoConfig)
    );
  }

  signIn() {
    this.account.signIn(this.email, this.password).subscribe(
      data => {
        this.info.open('Signed in', '', this.infoConfig);
        this.account.account = data;
        this.dialogRef.close(this.email);
      },
      error => this.info.open('Error, please try again later', '', this.infoConfig)
    );
  }

  fastSignIn() {
    this.account.account = {username: this.name};
    this.dialogRef.close(this.name);
  }

}
