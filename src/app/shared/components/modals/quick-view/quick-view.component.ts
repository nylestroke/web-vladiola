import { Component, OnInit, ViewEncapsulation, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import imagesLoaded from 'imagesloaded';

import { Product } from '../../../classes/product';

import { ApiService } from '../../../services/api.service';
import { CartService } from '../../../services/cart.service';
import { CompareService } from '../../../services/compare.service';
import { UtilsService } from '../../../services/utils.service';
import { WishlistService } from '../../../services/wishlist.service';
import { sliderOpt } from '../../../data';

@Component({
  selector: 'vio-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class QuickViewComponent implements OnInit {
  @Input() slug = '';

  product: Product;

  loaded = false;

  options = {
    ...sliderOpt,
    dots: false,
    nav: false,
    loop: false,
  };

  price = 0;

  paddingTop = '100%';

  currentIndex = 0;

  qty = 1;

  @ViewChild('singleSlider') singleSlider: any;

  constructor(
    public apiService: ApiService,
    public cartService: CartService,
    public wishlistService: WishlistService,
    public compareService: CompareService,
    public utilsService: UtilsService,
    public router: Router,
    public el: ElementRef,
  ) {}

  public trackByFn(index, item) {
    if (!item) return null;
    return item.id;
  }

  ngOnInit(): void {
    this.apiService.fetchSingleProduct(+this.slug).subscribe((result) => {
      this.product = result;
      this.price = this.product.price;

      const image = new Image();
      image.src = this.product.photos[0].url;
      this.paddingTop =
        Math.floor(
          (parseFloat(image.height.toString()) / parseFloat(image.width.toString())) * 1000,
        ) /
          10 +
        '%';

      let self = this;
      imagesLoaded('.quickView-modal').on('done', function () {
        self.loaded = true;
      });
    });
  }

  itemChange(e: any, self: any) {
    document
      .querySelector('#product-image-gallery')
      .querySelector('.product-gallery-item.active')
      .classList.remove('active');
    document
      .querySelector('#product-image-gallery')
      .querySelectorAll('.product-gallery-item')
      [e.item.index].classList.add('active');

    self.currentIndex = e.item.index;
  }

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

  closeQuickView() {
    let modal = document.querySelector('.quickView-modal') as HTMLElement;
    if (modal) modal.click();
  }

  changeImage($event: Event, i = 0) {
    this.currentIndex = i;
    this.singleSlider.to(i);
    $event.preventDefault();
  }

  getProductDescription() {
    const noTags = this.product.description.replace(/(<([^>]+)>)/gi, '');
    return noTags.slice(0, 500);
  }
}
