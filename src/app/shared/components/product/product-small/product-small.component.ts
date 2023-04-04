import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../classes/product';

import { ModalService } from '../../../services/modal.service';
import { CartService } from '../../../services/cart.service';
import { WishlistService } from '../../../services/wishlist.service';
import { CompareService } from '../../../services/compare.service';

@Component({
  selector: 'vio-product-small',
  templateUrl: './product-small.component.html',
  styleUrls: ['./product-small.component.scss'],
})
export class ProductSmallComponent implements OnInit {
  @Input() product: Product;

  price: string;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private compareService: CompareService,
  ) {}

  ngOnInit(): void {
    this.price = this.product.price.toFixed(2);
  }

  addToCart(event: Event) {
    event.preventDefault();
    this.cartService.addToCart(this.product);
  }

  addToWishlist(event: Event) {
    event.preventDefault();

    if (this.isInWishlist()) {
      this.router.navigate(['/shop/wishlist']).then();
    } else {
      this.wishlistService.addToWishList(this.product);
    }
  }

  addToCompare(event: Event) {
    event.preventDefault();
    if (this.isInCompare()) return;
    this.compareService.addToCompare(this.product);
  }

  quickView(event: Event) {
    event.preventDefault();
    this.modalService.showQuickView(this.product);
  }

  isInCompare() {
    return this.compareService.isInCompare(this.product);
  }

  isInWishlist() {
    return this.wishlistService.isInWishlist(this.product);
  }
}
