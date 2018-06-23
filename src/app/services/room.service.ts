import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {Task} from '../classes/task';
import {$WebSocket} from 'angular2-websocket/angular2-websocket';
import {map} from 'rxjs/operators';


@Injectable()
export class RoomService {

  public roomId: string;
  public socketId: string;
  public tasks: Task[] = [];
  public taskVotes: Map<number, number> = new Map<number, number>();
  public websocket = new $WebSocket('ws://plpoker-api.azurewebsites.net/websocket');
  base = 'http://plpoker-api.azurewebsites.net';

  constructor(private http: HttpClient) {
  }

  createRoom(roomName: string) {
    return this.http.put(this.base + '/api/Rooms', {name: roomName});
  }

  getTasks() {
    return this.http.get(this.base + '/api/Rooms/' + this.roomId + '/tasks');
  }

  estimateTask(task: any, value: string) {
    return this.http.patch(this.base + '/api/tasks/' + task.id + '?estimate=' + value, {});
  }

  createTask(title: string) {
    return this.http.put(this.base + '/api/tasks', {title: title, RoomId: this.roomId});
  }

  getSummary() {
    return this.http.get(this.base + '/api/rooms/' + this.roomId + '/summary');
  }

  setUser(name: string, isEmail: boolean) {
    let body;
    isEmail ? body = {mailAddress: name} : body = {username: name};
    return this.http.post(this.base + '/api/Rooms/' + this.roomId + '/participant', body);
  }

  setHostUser(name: string, isEmail: boolean) {
    let body;
    isEmail ? body = {mailAddress: name} : body = {username: name};
    return this.http.post(this.base + '/api/Rooms/' + this.roomId + '/po', body);
  }

  sendToWebSocket(message) {
    message.roomId = this.roomId;
    message.socketId = this.socketId;
    console.log('sendToWS', JSON.stringify(message));
    this.websocket.send(JSON.stringify(message)).subscribe(
      (msg) => {
        console.log('next', msg.data);
      },
      (msg) => {
        console.log('error', msg);
        console.log('RETRY:');
        this.websocket.fireQueue();
      },
      () => {
        console.log('complete');
      }
    );
  }
  
  sendCSVFileToParse(httpFile: any, delimeter: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text/csv');
    const options = {headers: headers};
    const formData = new FormData();
    formData.append('httpFile', httpFile, httpFile.name);
    return this.http.post(this.base + '/api/tasks/' + this.roomId + '/parse?delimiter=' + delimeter, formData, options);
  }
  
  downloadCSV() {
    const path = this.base + '/api/Rooms/' + this.roomId + '/summary/export/csv';
    this.http.get(path, {responseType: 'blob'})
      .pipe(map((response: Blob) => {
        window.open(window.URL.createObjectURL(response));
      })).subscribe();
  }
}
