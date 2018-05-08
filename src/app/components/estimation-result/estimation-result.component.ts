import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-estimation-result',
  templateUrl: './estimation-result.component.html',
  styleUrls: ['./estimation-result.component.css']
})
export class EstimationResultComponent implements OnInit {

  @Input() values:string[];

  constructor() { }

  ngOnInit() {
  }

}
