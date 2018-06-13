import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AccountService {

  base = 'http://plpoker-api.azurewebsites.net';

  public account;

  constructor(private http: HttpClient) {
  }

  signUp(account: Account) {
    return this.http.put(this.base + '/api/Users', account)
  }

  signIn(mailAddress: string, password: string) {
    // TODO send request
  }

}

export class Account {
  constructor(public username: string, public  mailAddress: string, public password: string, public  team?: string) {
  }
}
