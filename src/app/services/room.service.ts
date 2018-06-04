import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {Summary} from "../components/summary/summary.component";

@Injectable()
export class RoomService {

  mockSummary: Summary = {
    roomName: "TSD project",
    date: "21.05.2018",
    tasks: [
      {name: "Task1", estimate: "4"},
      {name: "Task2", estimate: "40"},
      {name: "Task3", estimate: "1"},
      {name: "Task4", estimate: "10"},
    ],
    participants: [
      {name: "Peter"},
      {name: "Mateusz"},
      {name: "Maciej"}
    ]
  };

  mockTasks: any[] = [{
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {
    name: 'very important task',
    description: 'lorem lorem lorem loremlorem lorem lorem lorem ',
    priority: 3
  }, {name: 'very important task', description: 'lorem lorem lorem loremlorem lorem lorem lorem ', priority: 3}];
  mockPriorities: number[] = [1, 2, 3, 4];

  base = 'http://plpoker-api.azurewebsites.net';

  constructor(private http: HttpClient) {
  }

  createRoom(roomName: string) {
    return this.http.put(this.base + '/api/Rooms', {name: roomName});
  }

  getTasks(roomName: string) {
    return Observable.of(this.mockTasks);
  }

  estimateTask(task: any, value: string) {
    return Observable.of(true);
  }

  selectTaskToEstimate(task: any) {
    return Observable.of(true);
  }

  getPriorities() {
    return Observable.of(this.mockPriorities);
  }

  getSummary(roomId: string) {
    return Observable.of(this.mockSummary);
  }
}
