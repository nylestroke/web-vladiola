import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from '../../services/cookie.service';
import { Router } from '@angular/router';
import { PasswordValidator } from './password.validator';

@Component({
  selector: 'vio-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss'],
})
export class LoginLayoutComponent {
  authForm: FormGroup;

  registerForm: FormGroup;

  loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this.authForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(8), Validators.max(24)]],
      remind: [false, Validators.required],
    });

    this.registerForm = formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        password: ['', [Validators.required, Validators.min(8), Validators.max(24)]],
        re_password: ['', [Validators.required, Validators.min(8), Validators.max(24)]],
      },
      {
        validators: PasswordValidator.MatchPassword('password', 're_password'),
      },
    );
  }

  ngOnInit(): void {}

  submitAuthorize() {
    if (this.authForm.invalid) {
      this.toastrService.error('Forma logowania jest nieprawidłowa, prosimy o uzupełnienie');
      return;
    }

    const remindMe = this.authForm.controls.remind.value;

    this.loading = true;

    setTimeout(() => {
      this.apiService.fetchAuthorize(this.authForm.getRawValue()).subscribe({
        next: (user) => {
          this.loading = false;

          if (remindMe) {
            this.cookieService.setCookie('access_token', user.access_token, 14);
          } else {
            this.cookieService.setSessionCookie('access_token', user.access_token);
          }

          this.router.navigate(['/shop/dashboard']).then(() => {
            this.toastrService.info('Pomyślnie zalogowałes się', '', {
              closeButton: false,
              tapToDismiss: false,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1200);
          });
        },
        error: (err) => {
          this.loading = false;

          if (err.error.code === 404) {
            this.toastrService.error('Nieprawidłowy adres e-mail lub hasło');
            return;
          }

          this.toastrService.error(err.error.error);
        },
      });
    }, 1200);
  }

  submitRegister() {
    if (this.registerForm.invalid) {
      this.toastrService.error('Forma rejestracji jest nieprawidłowa, prosimy o uzupełnienie');
      return;
    }

    this.loading = true;

    setTimeout(() => {
      this.apiService.fetchRegister(this.registerForm.getRawValue()).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/pages/login']).then(() => {
            this.toastrService.info('Twoje konto zostało utworzone. Prosimy o zalogowanie się');
          });
        },
        error: (err) => {
          this.loading = false;

          if (err.error.code === 409) {
            this.toastrService.error('Użytkownik z takim adresem e-mail już istnieje');
            return;
          }

          this.toastrService.error(err.error.error);
        },
      });
    }, 1200);
  }

  hasError(form: FormGroup, controlName: string, errorCode: string): boolean {
    return form.controls[controlName].hasError(errorCode) && form.controls[controlName].touched;
  }
}
