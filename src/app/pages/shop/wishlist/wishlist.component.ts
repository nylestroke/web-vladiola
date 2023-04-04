import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { WishlistService } from 'src/app/shared/services/wishlist.service';

import { environment } from 'src/environments/environment';
import { Product } from '../../../shared/classes/product';

@Component({
  selector: 'shop-wishlist-page',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishItems: Product[] = [];

  SERVER_URL = environment.SERVER_URL;

  private subscr: Subscription;

  constructor(public wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.subscr = this.wishlistService.wishlistStream.subscribe((items) => {
      this.wishItems = [...items];
    });
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }
}
