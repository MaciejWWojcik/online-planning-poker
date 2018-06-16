import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Task} from '../../classes/task';

@Component({
  selector: 'app-import-tasks',
  templateUrl: './import-tasks.component.html',
  styleUrls: ['./import-tasks.component.css']
})
export class ImportTasksComponent implements OnInit {

  fileEvent: any;
  delimiter: string;
  delimiterDefault = ';';
  isFileChosen = false;
  fileName = 'No file chosen';

  constructor(private service: RoomService) {
  }

  ngOnInit() {
    this.delimiter = this.delimiterDefault;
  }

  parseCSV() {
    const file = this.fileEvent.target.files[0];
    this.service.sendCSVFileToParse(file, this.delimiter).subscribe((tasks: Task[]) => {
      tasks.forEach((task) => {
        this.service.tasks.push(task);
      });
    });
  }

  onFileChosen(event: any) {
    if (event.target.files) {
      this.fileEvent = event;
      this.isFileChosen = true;
      this.fileName = this.fileEvent.target.files[0].name;
    }
  }

}
