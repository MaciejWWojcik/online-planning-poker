import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-estimate-submit',
  templateUrl: './estimate-submit.component.html',
  styleUrls: ['./estimate-submit.component.css']
})
export class EstimateSubmitComponent implements OnInit {

  @Input() estimationResult:string;
  @Output() estimation: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  save(){
    this.estimation.emit(this.estimationResult);
  }

  restart(){
    this.estimation.emit('restart');
  }

}
