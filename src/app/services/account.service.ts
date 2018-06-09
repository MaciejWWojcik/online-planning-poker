import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  base = 'http://plpoker-api.azurewebsites.net';

  constructor(private http: HttpClient) {
  }

  singUp(account: Acccount) {
    // TODO send request
  }

  signIn(email: string, password: string){
    // TODO send request
  }

}

export class Acccount {
  constructor(public username: string, public  email: string, public  password: string, public  team?: string) {
  }
}
