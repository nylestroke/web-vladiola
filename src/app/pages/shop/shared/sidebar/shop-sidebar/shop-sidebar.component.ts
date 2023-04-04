import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../../shared/services/api.service';

@Component({
  selector: 'vio-shop-sidebar',
  templateUrl: './shop-sidebar.component.html',
  styleUrls: ['./shop-sidebar.component.scss'],
})
export class ShopSidebarComponent implements OnInit {
  @Input() toggle = false;

  categories: any[] = [];

  params: any = {};

  priceRange: number[] = [0, 1500];

  @ViewChild('priceSlider') priceSlider: any;

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    private apiService: ApiService,
  ) {
    this.apiService.fetchAllCategories().subscribe((result) => {
      this.categories = result.data;
    });

    activeRoute.queryParams.subscribe((params) => {
      this.params = params;
      if (params.minPrice && params.maxPrice) {
        this.priceRange = [params.minPrice, params.maxPrice];
      } else {
        this.priceRange = [0, 1500];

        if (this.priceSlider) {
          this.priceSlider.slider.reset({ min: 0, max: 1500 });
        }
      }
    });
  }

  ngOnInit(): void {}

  filterPrice() {
    this.router
      .navigate([], {
        queryParams: {
          minPrice: this.priceRange[0],
          maxPrice: this.priceRange[1],
          page: 1,
        },
        queryParamsHandling: 'merge',
      })
      .then();
  }

  changeFilterPrice(value: any) {
    this.priceRange = [value[0], value[1]];
  }

  filterProducts(id: number) {
    this.router
      .navigate([], {
        queryParams: {
          category: id.toString(),
        },
        queryParamsHandling: 'merge',
      })
      .then();
  }

  brandActive(id: number) {
    if (!this.params.category) return false;
    return !!this.params.category.split(',').some((r) => id.toString().split(',').indexOf(r) >= 0);
  }

  cleanFilters() {
    this.router
      .navigate([], {
        queryParams: {},
      })
      .then(() => window.location.reload());
  }
}
