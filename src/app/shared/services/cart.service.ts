import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// RxJS
import { Subject, BehaviorSubject } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';

import { Product } from '../classes/product';
import { CartItem } from '../classes/cart-item';
import { cartItemsSelector } from '../../core/selectors/selectors';
import {
  AddToCartAction,
  RemoveFromCartAction,
  UpdateCartAction,
} from '../../core/actions/actions';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: CartItem[] = [];

  public cartStream: Subject<any> = new BehaviorSubject([]);

  public qtyTotal: Subject<number> = new BehaviorSubject(0);

  public priceTotal: Subject<number> = new BehaviorSubject(0);

  constructor(private store: Store<any>, private toastrService: ToastrService) {
    store.pipe(select(cartItemsSelector)).subscribe((items) => {
      this.cartItems = items;

      this.cartStream.next(items);

      this.qtyTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.qty;
        }, 0),
      );

      this.priceTotal.next(
        this.cartItems.reduce((acc, cur) => {
          return acc + cur.sum;
        }, 0),
      );
    });
  }

  // Product Add to Cart
  addToCart(product: Product, qty = 1) {
    if (this.canAddToCart(product, qty)) {
      this.store.dispatch(new AddToCartAction({ product, qty }));
      this.toastrService.success('Produkt dodany do koszyka.');
    } else {
      this.toastrService.error(
        'Nie możesz dodać tego produkty do koszyka z powodu braku jego na magazynie.',
      );
    }
  }

  // Product Removed from the Cart
  removeFromCart(product: CartItem) {
    this.store.dispatch(new RemoveFromCartAction({ product }));
    this.toastrService.success('Produkt usunięty z koszyka.');
  }

  // Cart update
  updateCart(cartItems: CartItem[]) {
    this.store.dispatch(new UpdateCartAction({ cartItems }));
    this.toastrService.success('Koszyk zaktualizowany.');
  }

  // Check whether product is in Cart or not
  isInCart(product: Product): boolean {
    return !!this.cartItems.find((item) => item.id == product.id);
  }

  // Check where product could be added to the cart
  canAddToCart(product: Product, qty = 1) {
    const find = this.cartItems.find((item) => item.id == product.id);

    if (find) {
      return !(product.count === 0 || (product.count && product.count < find.qty + qty));
    } else {
      return !(product.count === 0 || (product.count && product.count < qty));
    }
  }
}
