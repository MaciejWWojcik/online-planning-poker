import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  model: any = {};
  priorities: Observable<number[]>;

  constructor(private service: RoomService) {
  }

  ngOnInit() {
    this.priorities = this.service.getPriorities();
  }

  onCreateTask(taskForm: any) {
    console.log(taskForm);
  }

}
