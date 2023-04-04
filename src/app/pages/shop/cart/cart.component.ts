import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'shop-cart-page',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems = [];

  private subscr: Subscription;

  constructor(public cartService: CartService) {}

  ngOnInit() {
    this.subscr = this.cartService.cartStream.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    this.subscr.unsubscribe();
  }

  trackByFn(index: number, item: any) {
    if (!item) return null;
    return item.slug;
  }

  updateCart(event: any) {
    event.preventDefault();
    event.target.parentElement.querySelector('.icon-refresh').classList.add('load-more-rotating');

    setTimeout(() => {
      this.cartService.updateCart(this.cartItems);
      event.target.parentElement
        .querySelector('.icon-refresh')
        .classList.remove('load-more-rotating');
      document.querySelector('.btn-cart-update:not(.diabled)') &&
        document.querySelector('.btn-cart-update').classList.add('disabled');
    }, 400);
  }

  onChangeQty(event: number, product: any) {
    document.querySelector('.btn-cart-update.disabled') &&
      document.querySelector('.btn-cart-update.disabled').classList.remove('disabled');

    this.cartItems = this.cartItems.reduce((acc, cur) => {
      if (cur.html_title === product.html_title) {
        acc.push({
          ...cur,
          qty: event,
          sum: (cur.price ? cur.price : cur.price1) * event,
        });
      } else acc.push(cur);

      return acc;
    }, []);
  }
}
