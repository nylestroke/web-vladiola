import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../../shared/services/api.service';

@Component({
  selector: 'product-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() product: Product;

  reviewForm: FormGroup;

  opinion: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    public apiService: ApiService,
  ) {
    this.reviewForm = formBuilder.group({
      product_id: [0, Validators.required],
      opinion: [this.opinion, Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addReview() {
    if (this.reviewForm.invalid) {
      this.toastrService.info('Nie wszystkie pola są uzupełnione');
      return;
    }

    this.reviewForm.patchValue({ product_id: this.product.id, opinion: this.opinion });

    this.apiService.fetchSaveReview(this.reviewForm.getRawValue()).subscribe({
      next: () => {
        this.reviewForm.reset();
        this.toastrService.info('Dziękujemy za opinię, ona została zapisana pomyślnie.');
      },
      error: () => {
        this.reviewForm.reset();
        this.toastrService.error('Coś poszło nie tak. Spróbuj ponownie później');
      },
    });
  }

  setRating = (event: any) => {
    event.preventDefault();

    this.opinion = event.currentTarget.classList[0].split('star-')[1];

    console.log(this.opinion);

    if (event.currentTarget.parentNode.querySelector('.active')) {
      event.currentTarget.parentNode.querySelector('.active').classList.remove('active');
    }

    event.currentTarget.classList.add('active');
  };

  getReviewTitle(opinion: number) {
    if (opinion === 1) return `Ocena: Bardzo słaba `;
    if (opinion === 2) return `Ocena: Nie tak źle`;
    if (opinion === 3) return `Ocena: Przeciętna`;
    if (opinion === 4) return `Ocena: Dobra`;
    if (opinion === 5) return `Ocena: Świetna`;

    return 'Ocena: ---';
  }

  hasError(controlName: string, errorCode: string): boolean {
    return (
      this.reviewForm.controls[controlName].hasError(errorCode) &&
      this.reviewForm.controls[controlName].touched
    );
  }
}
