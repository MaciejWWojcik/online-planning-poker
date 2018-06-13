import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppComponent {
  title = 'Online Planning Poker';
  subtitle = 'TSD project 2018';
  members: string[] = ['Mateusz Kiciński', 'Piotr Mitkowski', 'Maciej Wójcik'];
}
