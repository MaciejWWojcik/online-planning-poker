import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';

@Injectable()
export class RoomService {

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

  constructor(private http: HttpClient) {
  }

  createRoom(roomName: string) {
    return Observable.of(true);
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
}
