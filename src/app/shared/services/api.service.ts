import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ListFilterRequest } from '../../core/filters/ListFilterRequest';
import { AuthorizeRequest } from '../classes/authorize.request';
import { RegisterRequest } from '../classes/register.request';
import { RecoverPasswordRequest } from '../classes/recover-password.request';
import { ChangePasswordRequest } from '../classes/change-password.request';
import { ResetPasswordRequest } from '../classes/reset-password.request';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from './cookie.service';
import { User } from '../classes/user';
import { SendContactEmail } from '../classes/send-contact-email';
import { ReviewRequest } from '../classes/review-request';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  token: string = `Bearer ${this.cookieService.getCookie('access_token')}`;

  headers = {
    headers: {
      Authorization: this.token,
    },
  };

  public fetchAllProducts(request: ListFilterRequest): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/product/all`, request);
  }

  public fetchSingleProduct(productId: number): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/product/${productId}`);
  }

  public fetchAllCategories(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/product/categories`);
  }

  public fetchAuthorize(request: AuthorizeRequest): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/auth/authorize`, request);
  }

  public fetchLogout() {
    this.cookieService.deleteCookie('access_token');
    this.router.navigate(['/']).then(() => {
      this.toastrService.info('Zostałes wylogowany pomyślnie');
    });
  }

  public fetchRegister(request: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/auth/register`, request);
  }

  public fetchRecoverPassword(request: RecoverPasswordRequest): Observable<any> {
    return this.http.patch(`${environment.SERVER_URL}/api/auth/recover-password`, request);
  }

  public fetchChangePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/api/auth/change-password`, request);
  }

  public fetchResetPassword(request: ResetPasswordRequest): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/api/auth/reset-password`, request);
  }

  public fetchSingleUser(userId: number): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/api/users/${userId}`, this.headers);
  }

  public fetchUserUpdate(user: User): Observable<any> {
    return this.http.put(`${environment.SERVER_URL}/api/users/update`, user, this.headers);
  }

  public fetchSendContactEmail(request: SendContactEmail): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/contact`, request);
  }

  public fetchSaveReview(request: ReviewRequest): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/product/review`, request);
  }
}
