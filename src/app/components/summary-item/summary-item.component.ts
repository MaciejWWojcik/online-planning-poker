import {Component, Input, OnInit} from '@angular/core';
import {Summary} from "../summary/summary.component";

@Component({
  selector: 'app-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.css']
})
export class SummaryItemComponent implements OnInit {

  @Input() summary: Summary;

  constructor() {
  }

  ngOnInit() {
    console.log(this.summary)
  }

}
