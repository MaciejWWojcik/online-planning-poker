import { Component, OnInit } from '@angular/core';
import {Summary} from "../summary/summary.component";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  rooms: Summary[];

  constructor(private account: AccountService) { }

  ngOnInit() {
    this.account.getSummaries().subscribe(
      (data: any) => this.rooms = data,
      error => console.error(error)
    )
  }

}
