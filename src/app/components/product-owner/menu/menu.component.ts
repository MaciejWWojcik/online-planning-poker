import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {CreateTaskComponent} from '../../create-task/create-task.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() emitter: EventEmitter<string> = new EventEmitter();

  constructor(private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onCreateButtonClicked() {
    this.dialog.open(CreateTaskComponent);
  }

  endGame(){
    this.emitter.emit('end');
  }
}
