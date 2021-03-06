import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  values: string[];
  isActive = true;
  value:string;
  @Output() estimated: EventEmitter<string> = new EventEmitter<string>();
  disableButtons = false;

  constructor() {
  }

  ngOnInit() {
    this.values = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '100'];
  }


  estimate(value:string){
    this.isActive = false;
    this.value = value;
    this.estimated.emit(value);
    this.disableButtons = true;
  }
}
