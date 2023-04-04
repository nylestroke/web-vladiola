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

// eslint-disable-next-line import/no-extraneous-dependencies
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
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

    if (!accessToken) {
      this.router.navigate(['/pages/login']).then();
      this.toastrService.info('Dostęp do tej witryny mają wyłącznie osoby zalogowane');
      return false;
    }

    return true;
  }
}
