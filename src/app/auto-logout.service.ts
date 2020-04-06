import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {LocalApiCallsService} from "./local-api-calls.service";

const MINUTES_UNTIL_AUTO_LOGOUT = 2; // in minutes
const CHECK_INTERVAL = 15000; // in ms
const STORE_KEY = 'lastAction';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  constructor(private router: Router,
              private localApiService: LocalApiCallsService) {

  }

  public init() {
    this.setLastAction(Date.now());
    this.initListener();
    this.initInterval();
    this.check();
  }

  public destroyListener() {
    document.body.removeEventListener('click', () => this.reset());
    document.body.removeEventListener('mouseover', () => this.reset());
    document.body.removeEventListener('mouseout', () => this.reset());
    document.body.removeEventListener('keydown', () => this.reset());
    document.body.removeEventListener('keyup', () => this.reset());
    document.body.removeEventListener('keypress', () => this.reset());
  }

  public getLastAction() {
    return parseInt(localStorage.getItem(STORE_KEY), 10);
  }

  public setLastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  private initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  private reset() {
    this.setLastAction(Date.now());
  }

  private initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  private check() {
    const now = Date.now();
    const timeLeft = this.getLastAction() + MINUTES_UNTIL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeLeft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      localStorage.clear();
      this.router.navigate(['/']).then(_ => {
        this.destroyListener();
        this.localApiService.closeSession();
      });
    }
  }
}
