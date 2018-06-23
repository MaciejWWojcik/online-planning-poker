import { Component, OnInit } from '@angular/core';
import {Team} from "../team/team.component";
import {AccountService} from "../../services/account.service";
import {CreateUserComponent} from "../create-user/create-user.component";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  name:string;

  constructor(private account: AccountService, public dialogRef: MatDialogRef<TeamCreateComponent>,) { }

  ngOnInit() {
  }

  createTeam(){
    let team = new Team(this.name, this.account.account.mailAddress, []);
    this.account.createTeam(team).subscribe()
    this.dialogRef.close();
  }

}
