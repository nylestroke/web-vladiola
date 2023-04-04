import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../../shared/classes/product';

import { CartService } from '../../../../shared/services/cart.service';
import { WishlistService } from '../../../../shared/services/wishlist.service';
import { CompareService } from '../../../../shared/services/compare.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() product: Product;

  qty = 1;

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService,
    public compareService: CompareService,
    public router: Router,
    public el: ElementRef,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {}

  addCart(event: Event) {
    event.preventDefault();
    if ((event.currentTarget as HTMLElement).classList.contains('btn-disabled')) return;

    this.cartService.addToCart({ ...this.product }, this.qty);
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

  isInCompare() {
    return this.compareService.isInCompare(this.product);
  }

  isInWishlist() {
    return this.wishlistService.isInWishlist(this.product);
  }

  onChangeQty(current: number) {
    this.qty = current;
  }

  getLink() {
    return 'www.' + window.location.host + window.location.pathname;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.getLink()).then(() => {});
    this.toastrService.info('Skopiowano do schowka');
  }
}
