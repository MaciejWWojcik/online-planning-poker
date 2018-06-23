import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateTaskComponent} from '../../create-task/create-task.component';
import {ImportTasksComponent} from '../../import-tasks/import-tasks.component';
import {RoomService} from "../../../services/room.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() emitter: EventEmitter<string> = new EventEmitter();
  baseUrl = 'http://online-planning-poker.herokuapp.com/#/room/participant/';

  constructor(private dialog: MatDialog, public service: RoomService) {
  }

  ngOnInit() {
  }

  onCreateButtonClicked() {
    this.dialog.open(CreateTaskComponent);
  }

  endGame() {
    this.emitter.emit('end');
  }

  importTasks() {
    this.dialog.open(ImportTasksComponent);
  }
}
