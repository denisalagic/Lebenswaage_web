import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalApiCallsService {


  constructor(private http: HttpClient) {
  }

  public startMoneySession(): Observable<any> {
    return this.http.get(environment.rpiApiUrl + 'start_money_session').pipe(map(resp => {
      return resp;
    }));
  }

  public acceptMoney(): Observable<any> {
    return this.http.get(environment.rpiApiUrl + 'accept_money').pipe(map(resp => {
      return resp;
    }));
  }

  public returnAllMoney(): Observable<any> {
    return this.http.get(environment.rpiApiUrl + 'eject_money/reject').pipe(map(resp => {
      return resp;
    }));
  }

  public returnOverflowMoney(): Observable<any> {
    return this.http.get(environment.rpiApiUrl + 'eject_money/accept').pipe(map(resp => {
      return resp;
    }));
  }

  public closeSession(): Observable<any> {
    return this.http.get(environment.rpiApiUrl + 'close_session').pipe(map(resp => {
      return resp;
    }));
  }

  public getMeasurments(): Observable<any[]> {
    let weight = this.http.get(environment.rpiApiUrl + 'sensor/weight');
    let height = this.http.get(environment.rpiApiUrl + 'sensor/height');
    return forkJoin([weight, height]);
  }
}
