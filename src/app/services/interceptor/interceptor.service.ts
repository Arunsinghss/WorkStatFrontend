import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareService } from '../share/share.service';
import { environment } from '../../../environments/environment.prod';
import { DataservicesService } from '../data/dataservices.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private shareService: ShareService,
    private dataService: DataservicesService, ) { }

  // attached to the header after authorized

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    const userDetails = this.shareService.getToken();
    let token = null;
    if (userDetails && userDetails) {
      token = userDetails;
    }
    const idToken = userDetails ? this.shareService.getToken() : null;
    const requestClone = request.clone({
      headers: idToken ? request.headers.set('Authorization', 'Token ' + idToken) : token ?
        request.headers.set('Authorization', 'Token ' + token) : null,
    });

    return next.handle(requestClone).pipe(
      tap(
        event => {
          this.dataService.setLoaderFlag(true);
          if (event instanceof HttpResponse) {
            this.dataService.setLoaderFlag(false);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.shareService.logout();
            } else if (error.status === 500) {
              Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Internal server error. Contact Tech Team',
              });
              this.dataService.setLoaderFlag(false);
            } else if (error.status === 502) {
              Swal.fire({
                icon: 'error',
                title: 'System Down',
                text: 'Please retry after 2 mins and then contact Tech Team',
              });
              this.dataService.setLoaderFlag(false);
            } else if (error.status === 403) {
              Swal.fire({
                icon: 'error',
                title: 'Forbidden',
                text: 'You are not Authorized to do this action',
              });
              // this.router.navigate(['/back-soon-page']);
              this.dataService.setLoaderFlag(false);
            } else if (error.status === 400) {
              Swal.fire({
                icon: 'error',
                title: 'Bad Request',
                text: error.error.message ? error.error.message : error.error.msg ? error.error.msg : 'Bad Request. Try again with correct inputs',
              });
              this.dataService.setLoaderFlag(false);
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Unknown Error',
                text: error.error.message ? error.error.message : error.error.msg ? error.error.msg : 'Please check your connection and retry after 2 mins',
              });
              this.dataService.setLoaderFlag(false);
            }
          }
        }
      )
    );
  }
}
