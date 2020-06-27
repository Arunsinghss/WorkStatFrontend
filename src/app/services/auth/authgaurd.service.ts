import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { DataservicesService } from '../../services/data/dataservices.service';
import { ShareService } from '../share/share.service';

@Injectable({
  providedIn: 'root'
})
export class AuthgaurdService implements CanActivate {

  constructor(private router: Router, private sharedService: ShareService, private dataservices: DataservicesService) {

  }

  // check user have permission to access those url or not
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userdetails = this.sharedService.getToken();
    const currentUrl = { redirectUrl: state.url };
    if (!this.isValid(userdetails)) {
      this.sharedService.logout();
      this.dataservices.setUserLoggedInStatus(false);
      this.router.navigate(['login'], { queryParams: currentUrl });
      return false;
    } else {
      this.dataservices.setUserLoggedInStatus(true);
      return true;
    }

  }

  private isValid(userdetails): boolean {
    if (userdetails == null) {
      return false;
    } else { return true; }
  }

}

