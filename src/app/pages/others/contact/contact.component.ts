import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'pages-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent implements OnInit {
  contactForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.contactForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submit() {
    if (this.contactForm.invalid) {
      this.toastrService.info('Nie wszystkie pola są uzupełnione');
      return;
    }

    this.apiService.fetchSendContactEmail(this.contactForm.getRawValue()).subscribe({
      next: () => {
        this.contactForm.reset();
        this.toastrService.info('Dziękujemy za kontakt. Wiadomość została wysłana.');
      },
      error: () => {
        this.contactForm.reset();
        this.toastrService.error('Coś poszło nie tak. Spróbuj ponownie później');
      },
    });
  }

  ngOnInit(): void {}

  hasError(controlName: string, errorCode: string): boolean {
    return (
      this.contactForm.controls[controlName].hasError(errorCode) &&
      this.contactForm.controls[controlName].touched
    );
  }
}
