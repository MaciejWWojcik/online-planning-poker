import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../services/account.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  @Input() team: Team;
  email: string;

  constructor(private account: AccountService) {
  }

  ngOnInit() {
  }

  add() {
    this.account.addTeamMember(this.email, this.team.id).subscribe(
      data => this.team.members.push(this.email),
      error => console.error(error)
    );
  }
}

export class Team {
  public id: string;

  constructor(public name: string, public creator: string, public members: string[]) {
  }
}
