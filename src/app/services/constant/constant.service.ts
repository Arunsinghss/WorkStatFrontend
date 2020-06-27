import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantService {
  constructor() { }

  // Api call url

  // login
  loginurl = 'employee/login/';
  employee = 'employee/emp/';
  getDesignation = 'employee/designation/';
}
