import { Component, OnInit } from '@angular/core';

import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'vio-cart-menu',
  templateUrl: './cart-menu.component.html',
  styleUrls: ['./cart-menu.component.scss'],
})
export class CartMenuComponent implements OnInit {
  constructor(public cartService: CartService) {}

  ngOnInit(): void {}

  removeFromCart(event: Event, product: any) {
    event.preventDefault();
    this.cartService.removeFromCart(product);
  }
}
