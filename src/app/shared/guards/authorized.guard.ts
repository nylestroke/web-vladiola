import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthorizedGuard implements CanActivate {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const accessToken = this.cookieService.getCookie('access_token');

    if (accessToken) {
      this.router.navigate(['/shop/dashboard']).then(() => {
        this.toastrService.info('Jesteś juz zalogowany. Przekierowanie do panelu użytkownika..');
      });
      return false;
    }

    return true;
  }
}
