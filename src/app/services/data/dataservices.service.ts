
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as Rx from 'rxjs';
import { Router } from '@angular/router';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { Observable } from 'rxjs';
import * as _moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DataservicesService {
  private agentData: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public agentDetails = this.agentData.asObservable();
  public headerText = new BehaviorSubject('');
  loggedInStatus = new Rx.BehaviorSubject(false);
  loaderFlag = new Rx.BehaviorSubject(false);
  loaderTimerObject: any;
  cgId;
  isLoggedIn = this.loggedInStatus.asObservable();
  constructor(private router: Router) {
    this.loggedInStatus.next(false);
  }

  updateAgentName(items) {
    this.agentData.next(items);
  }
  setUserLoggedInStatus(flag) {
    this.loggedInStatus.next(flag);
  }

  setLoaderFlag(flag: boolean) {
    setTimeout(() => {
      this.loaderFlag.next(flag);
    });

  }

  loaderTimer() {
    clearTimeout(this.loaderTimerObject);
    this.loaderTimerObject = null;
    this.loaderTimerObject = setTimeout(() => {
      this.loaderFlag.next(false);
      this.router.navigate(['/page-not-found']);
    }, 30000);
  }

  get cgIds() {
    return this.cgId;
  }
  set cgIds(cgid) {
    this.cgId = cgid;
  }

  checkNumber(numbers) {
    const data = {
      mobileNumber: '',
      verified: false
    };
    const phoneUtil = PhoneNumberUtil.getInstance();
    // tslint:disable-next-line: variable-name
    const number = phoneUtil.parseAndKeepRawInput(numbers, 'IN');
    data.mobileNumber = number.getNationalNumber();
    data.verified = phoneUtil.isValidNumberForRegion(number, 'IN');
    return data;
  }

  getHeader(): Observable<string> {
    return this.headerText;
  }

  setHeader(value: string) {
    this.headerText.next(value);
  }

  formatDate(date) {
    return _moment(date).format('YYYY-MM-DD');
  }
}
