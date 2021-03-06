import {Component, OnInit} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  roomName: string;

  constructor(private roomService: RoomService, private router: Router, public dialogRef: MatDialogRef<CreateRoomComponent>) {
  }

  ngOnInit() {
  }

  createRoom() {
    this.roomService.createRoom(this.roomName).subscribe(
      (data: { id: number, name: string, link: string }) => {
        this.router.navigate(['/room/host', data.id]);
        this.dialogRef.close('Room created');
      }, (error) => {
        console.error('Create room error', error);
        this.router.navigate(['']);
        this.dialogRef.close(error);
      }
    );
  }
}
