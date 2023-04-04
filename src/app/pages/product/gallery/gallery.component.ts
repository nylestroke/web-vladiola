import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../shared/classes/product';
import { ApiService } from '../../../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-gallery-page',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryPageComponent implements OnInit {
  product: Product;

  prev: Product;

  next: Product;

  related = [];

  loaded = false;

  constructor(
    public apiService: ApiService,
    private activeRoute: ActivatedRoute,
    public router: Router,
  ) {
    activeRoute.params.subscribe((params) => {
      this.loaded = false;
      this.apiService.fetchSingleProduct(params.slug).subscribe({
        next: (response) => {
          this.product = response;
          this.prev = response.prevProduct;
          this.next = response.nextProduct;
          this.related = response.relatedProducts;

          this.apiService
            .fetchAllProducts({
              filter: [
                {
                  field: 'category_id',
                  value: this.product.category.id.toString(),
                },
              ],
              sort: [],
              page_size: 10,
              page_index: 0,
              sort_direction: 'asc',
            })
            .subscribe({
              next: (products) => {
                this.loaded = true;
                this.prev =
                  products.data[0].id !== this.product.id ? products.data[0] : products.data[1];
                this.next =
                  products.data[1].id !== this.product.id ? products.data[1] : products.data[2];

                this.related = products.data.slice(4, 10);
              },
            });
        },
        error: () => {
          this.router.navigate(['/pages/404']).then();
        },
      });
    });
  }

  ngOnInit(): void {}
}
