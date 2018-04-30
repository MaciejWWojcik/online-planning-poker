import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  values: string[];
  @Output() estimated: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }

  ngOnInit() {
    this.values = ['0', '1/2', '1', '2', '3', '5', '8', '13', '21', '34', '100', '?', 'Pizza!'];
  }

  estimate(value:string){
    this.estimated.emit(value);
  }
}
