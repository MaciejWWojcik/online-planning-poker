import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  name: string;
  description: string;

  constructor(private service: RoomService) {
  }

  ngOnInit() {
  }

  onCreateTask(taskForm: any) {
    console.log(this.name);
    this.service.createTask(this.name).subscribe(
      (data: any) => {
        this.service.tasks.push(data);
        this.service.taskVotes.set(data.id, 0);
        this.service.sendToWebSocket({roomId: this.service.roomId, type: 'new-task'});
      },
      error => console.error(error)
    );
  }

}
