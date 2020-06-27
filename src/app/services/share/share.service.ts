import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoTS from 'crypto-ts';
import { DataservicesService } from '../data/dataservices.service';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public SECRET_KEY = '786Qwe1Poi0aSd2lKj8zxD3mnB5786';
  private groupRole: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  public roles = this.groupRole.asObservable();
  work: any;
  constructor(private dataServices: DataservicesService, private router: Router) { }

  logout() {
    this.dataServices.setUserLoggedInStatus(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    const acquirer = localStorage.getItem('token');
    if (!acquirer) { this.logout(); return null; }
    const userDecryptedBytes = CryptoTS.AES.decrypt(acquirer, this.SECRET_KEY);
    const userDecryptedText = userDecryptedBytes.toString(CryptoTS.enc.Utf8);
    return JSON.parse(userDecryptedText);
  }


  getUserDetails() {
    const userDetails = localStorage.getItem('user_details');
    const userDetailsdDecryptedBytes = CryptoTS.AES.decrypt(userDetails, this.SECRET_KEY);
    const userDetailsDecryptedText = userDetailsdDecryptedBytes.toString(CryptoTS.enc.Utf8);
    return JSON.parse(userDetailsDecryptedText);
  }

  getEmpDetails() {
    const userDetails = localStorage.getItem('employee');
    const userDetailsdDecryptedBytes = CryptoTS.AES.decrypt(userDetails, this.SECRET_KEY);
    const userDetailsDecryptedText = userDetailsdDecryptedBytes.toString(CryptoTS.enc.Utf8);
    return JSON.parse(userDetailsDecryptedText);
  }

  // getAuthUserid() {
  //   const authDetails = localStorage.getItem('auth_user');
  //   const authDetailsdDecryptedBytes = CryptoTS.AES.decrypt(authDetails, this.SECRET_KEY);
  //   const authDetailsDecryptedText = authDetailsdDecryptedBytes.toString(CryptoTS.enc.Utf8);
  //   return JSON.parse(authDetailsDecryptedText);
  // }


  // getFullRole() {
  //   const roles = localStorage.getItem('roles');
  //   const roleDecryptedBytes = CryptoTS.AES.decrypt(roles, this.SECRET_KEY);
  //   const rolesIdsDecryptedText = roleDecryptedBytes.toString(CryptoTS.enc.Utf8);
  //   return JSON.parse(rolesIdsDecryptedText);
  // }

  // getFullAccess() {
  //   const access = localStorage.getItem('access');
  //   const accessDecryptedBytes = CryptoTS.AES.decrypt(access, this.SECRET_KEY);
  //   const accesssIdsDecryptedText = accessDecryptedBytes.toString(CryptoTS.enc.Utf8);
  //   return JSON.parse(accesssIdsDecryptedText);
  // }

  store_user_info(data) {
    const tokenEncryptedString = CryptoTS.AES.encrypt(JSON.stringify(data.token), this.SECRET_KEY);
    localStorage.setItem('token', tokenEncryptedString.toString());
    const userDetailsEncryptedString = CryptoTS.AES.encrypt(JSON.stringify(data.userdata), this.SECRET_KEY);
    localStorage.setItem('user_details', userDetailsEncryptedString.toString());
    const authdetailsEncryptedString = CryptoTS.AES.encrypt(JSON.stringify(data.empdata), this.SECRET_KEY);
    localStorage.setItem('employee', authdetailsEncryptedString.toString());
  }

  // // main function to assign value to deep access
  // changeValue(obj) {
  //   Object.keys(obj).map((d: any) => {
  //     if (obj[d] instanceof Object) {
  //       return this.changeValue(obj[d]);
  //     }
  //     obj[d] = this.checkRole(obj[d]);
  //   });
  // }

  // // create deep acces role value and store in local
  // checkAccessData(res) {
  //   const workAccess = res.work;
  //   this.changeValue(workAccess);
  //   const workAccessEncryptedString = CryptoTS.AES.encrypt(JSON.stringify(workAccess),
  //     this.SECRET_KEY);
  //   localStorage.setItem('accessRoles', workAccessEncryptedString.toString());
  // }

  // // get deep access role
  // getAccessRoles() {
  //   const accessRole = localStorage.getItem('accessRoles');
  //   if (!accessRole) { this.logout(); return null; }
  //   const accessDecryptedBytes = CryptoTS.AES.decrypt(accessRole, this.SECRET_KEY);
  //   const accessRoleIdsDecryptedText = accessDecryptedBytes.toString(CryptoTS.enc.Utf8);
  //   const afterDecrypt = JSON.parse(accessRoleIdsDecryptedText);
  //   this.groupRole.next(afterDecrypt);
  //   return JSON.parse(accessRoleIdsDecryptedText);
  // }

  // // check role function
  // checkRole(rstring) {
  //   const roles = this.getFullRole();
  //   if (roles.includes('Superuser')) {
  //     return true;
  //   }
  //   const reqorroles = rstring.split('|');
  //   const oracccess = [];
  //   reqorroles.forEach(orrule => {
  //     const reqandroles = orrule.split('&');
  //     const andaccess = [];
  //     reqandroles.forEach(rname => {
  //       if (rname.startsWith('!')) {
  //         andaccess.push(!roles.includes(rname.split('!')[1]));
  //       } else {
  //         andaccess.push(roles.includes(rname));
  //       }
  //     });
  //     if (andaccess.includes(false)) {
  //       oracccess.push(false);
  //     } else {
  //       oracccess.push(true);
  //     }
  //   });
  //   if (oracccess.includes(true)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
