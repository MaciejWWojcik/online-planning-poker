import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  logging = false;

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private account: AccountService, private info: MatSnackBar) {
  }

  ngOnInit() {
  }

  signIn() {
    this.logging = true;
    this.account.signIn(this.email, this.password).subscribe(
      data => {
        this.info.open('Signed in');
        this.account.account = data;
        this.dialogRef.close(this.email);
      },
      error => this.info.open('Error, please try again later', '', {duration: 3000})
    );
  }
}
