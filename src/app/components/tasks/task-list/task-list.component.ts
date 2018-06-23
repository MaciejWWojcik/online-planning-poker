import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  taskHighlated;
  @Input() tasks: any[];
  @Input() tasksVotes: Map<number, number>;
  @Output() taskSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onTaskSelect(task) {
    this.taskSelected.emit(task);
    this.taskHighlated = task;
  }

  getVotesForTask(task) {
    if (this.tasksVotes) {
      return this.tasksVotes.get(task.id);
    } else {
      return null;
    }

  }
}
