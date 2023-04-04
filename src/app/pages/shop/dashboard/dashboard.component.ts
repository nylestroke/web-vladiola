import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { CookieService } from '../../../shared/services/cookie.service';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from '../../../shared/components/login-layout/password.validator';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../shared/classes/user';

@Component({
  selector: 'shop-dashboard-page',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  user: User;

  userForm: FormGroup;

  billingAddress: string;

  loading: boolean = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public apiService: ApiService,
    private cookieService: CookieService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.userForm = formBuilder.group(
      {
        id: [0, Validators.required],
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        street: [''],
        house_num: [''],
        city: [''],
        postcode: [''],
        company_name: [''],
        nickname: [''],
        old_password: ['', [Validators.min(8), Validators.max(24)]],
        password: ['', [Validators.min(8), Validators.max(24)]],
        re_password: ['', [Validators.min(8), Validators.max(24)]],
      },
      {
        validators: PasswordValidator.MatchPassword('password', 're_password'),
      },
    );

    const token = this.cookieService.getCookie('access_token');
    const decodedToken: any = jwt_decode(token);

    this.apiService.fetchSingleUser(decodedToken.id).subscribe({
      next: (user: User) => {
        this.user = user;
        this.userForm.patchValue(user);

        if (user.city && user.street && user.house_num && user.postcode) {
          this.billingAddress =
            user?.city + ', ' + user?.street + '/' + user?.house_num + ', ' + user?.postcode;
        } else {
          this.billingAddress = '---';
        }
      },
    });
  }

  ngOnInit(): void {}

  submitEdit() {
    if (this.userForm.invalid) {
      this.toastrService.error('Dane są nieprawidłowe, prosimy o poprawienie');
      return;
    }

    this.loading = true;

    const editedPassword = this.userForm.get('password').value;

    setTimeout(() => {
      this.apiService.fetchUserUpdate(this.userForm.getRawValue()).subscribe({
        next: (user: User) => {
          this.user = user;
          this.userForm.patchValue(user);
          this.loading = false;

          if (editedPassword) {
            this.apiService.fetchLogout();
            this.toastrService.info('Zmieniłes pomyślnie hasło. Prosimy o ponowne zalogowanie się');
            return;
          }

          this.toastrService.info('Zmiany zostały zapisane');
        },
        error: (err) => {
          this.loading = false;

          if (err.error.code === 400) {
            this.toastrService.error('Poprzednie hasło jest nieprawidłowe');
            return;
          }

          if (err.error.code === 409) {
            this.toastrService.error(
              'Użytkownik z takim adresem e-mail lub nazwą konta juz istnieje',
            );
            return;
          }

          this.toastrService.error(err.error.error);
        },
      });
    }, 1200);
  }

  viewTab($event: Event, prevId: number, nextId: number) {
    $event.preventDefault();
    let nodes = this.el.nativeElement.querySelectorAll('.nav-dashboard .nav-link');
    this.renderer.removeClass(nodes[prevId], 'active');
    this.renderer.addClass(nodes[nextId], 'active');
  }
}
