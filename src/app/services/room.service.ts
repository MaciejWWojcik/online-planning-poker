import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/observable/of';

@Injectable()
export class RoomService{

  constructor(private http: HttpClient){}

  createRoom(roomName:string){
    return Observable.of(true);
  }
}
