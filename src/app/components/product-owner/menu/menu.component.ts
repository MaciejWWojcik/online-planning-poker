import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateTaskComponent} from '../../create-task/create-task.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onCreateButtonClicked() {
    this.dialog.open(CreateTaskComponent);
  }
}
