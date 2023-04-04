import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../../shared/services/cart.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'shop-checkout-page',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cartItems = [];

  shippingCost = 0;

  checkoutForm: FormGroup;

  private subscr: Subscription;

  constructor(
    public cartService: CartService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.checkoutForm = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      company_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', [Validators.required, Validators.pattern(/^[0-9]{2}-[0-9]{3}/)]],
      phone: [
        '',
        [
          Validators.required,
          // eslint-disable-next-line security/detect-unsafe-regex
          Validators.pattern(/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      notes: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.subscr = this.cartService.cartStream.subscribe((items) => {
      this.cartItems = items;
    });

    document.querySelector('body').addEventListener('click', () => this.clearOpacity());
  }

  changeShipping(value: number) {
    this.shippingCost = value;
  }

  totalPrice(price: number) {
    return price + this.shippingCost;
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
    document.querySelector('body').removeEventListener('click', () => this.clearOpacity());
  }

  clearOpacity() {
    let input: any = document.querySelector('#checkout-discount-input');
    if (input && input.value == '') {
      let label: any = document.querySelector('#checkout-discount-form label');
      label.removeAttribute('style');
    }
  }

  checkout() {}
}
