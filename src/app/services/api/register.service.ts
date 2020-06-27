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

  getEmployee() {
    return this.httpclient.get(this.baseUrl + this.constantService.employee);
  }

  getDesignation() {
    return this.httpclient.get(this.baseUrl + this.constantService.getDesignation);
  }

  createDesignation(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.getDesignation, requestParam);
  }

  createNewProject(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.addProject, requestParam);
  }

  assignProject(requestParam, id) {
    return this.httpclient.patch(this.baseUrl + this.constantService.addProject + id + '/', requestParam);
  }

  getProject() {
    return this.httpclient.get(this.baseUrl + this.constantService.addProject);
  }

  getProjectbyId(id) {
    return this.httpclient.get(this.baseUrl + this.constantService.addProject + id);
  }

  logout(requestParam) {
    return this.httpclient.post(this.baseUrl + this.constantService.loginurl, requestParam);
  }
}
