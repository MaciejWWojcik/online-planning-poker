import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  base = 'http://plpoker-api.azurewebsites.net';

  public account;

  constructor(private http: HttpClient) {
  }

  signUp(account: Account) {
    // TODO send request
  }

  signIn(email: string, password: string){
    // TODO send request
  }

}

export class Account {
  constructor(public username: string, public  email: string,password: string, public  team?: string) {
  }
}
