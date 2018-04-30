import {Component, OnInit} from '@angular/core';
import {EstimationTask} from '../../estimation-task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  model: any = {};
  priorities: number[];

  constructor() {
  }

  ngOnInit() {
    this.priorities = this.mockPriorities();
  }

  mockPriorities() {
    return [1, 2, 3, 4];
  }

  onCreateTask(taskForm: any) {
    console.log(taskForm);
  }

}
