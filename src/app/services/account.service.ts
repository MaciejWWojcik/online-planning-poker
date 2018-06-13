import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Team} from "../components/team/team.component";

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
    return this.http.post(this.base + '/api/Users', {mailAddress: mailAddress, password: password});
  }

  getSummaries() {
    if (!this.account) {
      return Observable.of(false)
    }
    return this.http.get(this.base + '/api/Users/' + this.account.mailAddress + '/summaries');
  }

  createTeam(team: Team) {
    if (!this.account) {
      return Observable.of(false)
    }
    return this.http.put(this.base + '/api/teams/', team);
  }

  addTeamMember(email: string, id: string) {
    if (!this.account) {
      return Observable.of(false)
    }
    return this.http.post(this.base + '/api/teams/' + id,{mailAddress: email});
  }

  getTeams() {
    if (!this.account) {
      return Observable.of(false)
    }
    return this.http.get(this.base + '/api/Users/' + this.account.mailAddress+'/teams');
  }

}

export class Account {
  constructor(public username: string, public  mailAddress: string, public password: string, public  team?: string) {
  }
}
