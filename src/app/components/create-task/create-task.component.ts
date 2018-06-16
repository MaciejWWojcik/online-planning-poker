import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  name: string;
  description: string;

  constructor(private service: RoomService, private info: MatSnackBar) {
  }

  ngOnInit() {
  }

  onCreateTask(taskForm: any) {
    this.service.createTask(this.name).subscribe(
      (data: any) => {
        this.service.tasks.push(data);
        this.service.taskVotes.set(data.id, 0);
        this.service.sendToWebSocket({roomId: this.service.roomId, type: 'new-task'});
        this.info.open('New task created', '', {duration: 3000});
      },
      error => console.error(error)
    );
  }

}
