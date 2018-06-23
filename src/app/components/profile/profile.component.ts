import {Component, OnInit} from '@angular/core';
import {Summary} from '../summary/summary.component';
import {AccountService} from '../../services/account.service';
import {Team} from '../team/team.component';
import {MatDialog} from '@angular/material';
import {TeamCreateComponent} from '../team-create/team-create.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  rooms: Summary[];
  teams: Team[];
  isHistoryFetched = false;

  constructor(private account: AccountService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.account.getSummaries().subscribe(
      (data: any) => {
        this.rooms = data;
      },
      error => console.error(error)
    );
    this.account.getTeams().subscribe(
      (data: any) => {
        this.teams = data;
      },
      error => console.error(error)
    );
  }

  createTeam() {
    let dialog = this.dialog.open(TeamCreateComponent);
    dialog.afterClosed().subscribe(
      data => this.teams.push(data),
      error => console.error(error)
    );
  }


}
