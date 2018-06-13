import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material";
import {DiscussionComponent} from "../discussion/discussion.component";

@Component({
  selector: 'app-estimate-submit',
  templateUrl: './estimate-submit.component.html',
  styleUrls: ['./estimate-submit.component.css']
})
export class EstimateSubmitComponent implements OnInit {

  @Input() estimationResult;
  @Output() estimation: EventEmitter<string> = new EventEmitter<string>();


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  save(){
    this.estimation.emit(this.estimationResult+'');
  }

  restart(){
    this.estimation.emit('restart');
  }

  show(){
    this.estimation.emit('show')
  }

  discuss(){
    this.estimation.emit('discuss')
  }
}
