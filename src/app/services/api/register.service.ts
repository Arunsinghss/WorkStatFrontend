import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../constant/constant.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl: string = environment.path;

  constructor(
    private httpclient: HttpClient,
    private constantService: ConstantService
  ) { }


  // verify otp and login both function called same api
  login(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.loginurl, requestParam);
  }

  registerEmployee(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.employee, requestParam);
  }

  getDesignation() {
    return this.httpclient.get(this.baseUrl + this.constantService.getDesignation);
  }

  createDesignation() {
    return this.httpclient.get(this.baseUrl + this.constantService.getDesignation);
  }

  logout(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.loginurl, requestParam);
  }
}
