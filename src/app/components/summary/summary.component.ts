import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  roomId: string;
  summary: Summary;

  constructor(private route: ActivatedRoute, private service: RoomService) {
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params.id;
    this.service.getSummary().subscribe(
      (data: any) => {
        this.summary = data;
      },
      error => console.error(error)
    );
  }

  downloadCSV() {
    this.service.downloadCSV();
  }

}

export interface Summary {
  date: string;
  roomName: string;
  tasks: { title: string, estimate: string }[];
  participants: { userName: string }[];
}
