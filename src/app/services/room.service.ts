import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/observable/of';
import {Task} from "../classes/task";
import {$WebSocket} from "angular2-websocket/angular2-websocket";

@Injectable()
export class RoomService {

  public roomId; string;
  public tasks: Task[] = [];
  public websocket = new $WebSocket("ws://plpoker-api.azurewebsites.net/websocket");

  base = 'http://plpoker-api.azurewebsites.net';
  constructor(private http: HttpClient) {
  }

  createRoom(roomName: string) {
    return this.http.put(this.base+'/api/Rooms',{name:roomName});
  }

  getTasks() {
    return this.http.get(this.base+'/api/Rooms/'+this.roomId+'/tasks');
  }

  estimateTask(task: any, value: string) {
    return this.http.patch(this.base+'/api/tasks/'+task.id+'?estimate'+value,{});
  }

  createTask(title: string) {
    return this.http.put(this.base+'/api/tasks',{title: title, RoomId: this.roomId});
  }

  getSummary(){
    return this.http.get(this.base+'/api/rooms/'+this.roomId+'/summary');
  }

  setUser(name: string){
    return this.http.post(this.base+'/api/Users/join', {name: name, roomId: this.roomId});
  }

  setHostUser(name: string){
    return this.http.post(this.base+'/api/Users/po/join', {name: name, roomId: this.roomId});
  }

  sendToWebSocket(message){
    console.log('sendToWS', JSON.stringify(message))
    this.websocket.send(JSON.stringify(message)).subscribe(
      (msg)=> {
        console.log("next", msg.data);
      },
      (msg)=> {
        console.log("error", msg);
      },
      ()=> {
        console.log("complete");
      }
    );
  }
}
