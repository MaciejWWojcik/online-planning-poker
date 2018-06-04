import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  name: string;

  constructor(public dialogRef: MatDialogRef<CreateUserComponent>,) { }

  ngOnInit() {
  }

  save(){
    this.dialogRef.close(this.name);
  }

}
