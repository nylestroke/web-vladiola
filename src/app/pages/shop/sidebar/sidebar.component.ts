import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../shared/services/api.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { Product } from '../../../shared/classes/product';
import { ListFilterRequest } from '../../../core/filters/ListFilterRequest';

@Component({
  selector: 'shop-sidebar-page',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarPageComponent implements OnInit {
  products: Product[] = [];

  perPage = 12;

  totalCount = 0;

  orderBy = 'default';

  productParams: ListFilterRequest;

  categories: [] = [];

  minPrice: number = 0;

  maxPrice: number = 0;

  page = 1;

  toggle = false;

  searchTerm = '';

  loaded = false;

  firstLoad = false;

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public utilsService: UtilsService,
    public apiService: ApiService,
  ) {
    this.activeRoute.queryParams.subscribe((params) => {
      this.loaded = false;

      this.page = (params?.page ?? 1) - 1;

      if (params.category) {
        this.categories = params.category.split(',');
        console.log(this.categories);
      }

      if (params.maxPrice) {
        this.maxPrice = params.maxPrice;
      }

      if (params.minPrice) {
        this.minPrice = params.minPrice;
      }

      if (params.searchTerm) {
        this.searchTerm = params.searchTerm;
      } else {
        this.searchTerm = '';
      }

      if (params.orderBy) {
        this.orderBy = params.orderBy;
      } else {
        this.orderBy = 'default';
      }

      this.paramsSetup();

      this.apiService.fetchAllProducts(this.productParams).subscribe((result) => {
        this.products = result.data.filter((prod) => prod.photos[0]);
        this.totalCount = result.cnt;
        let filteredArray = result.data.filter((prod) => prod.photos[0]);

        if (this.minPrice) {
          filteredArray = result.data.filter((prod: Product) => prod.price >= this.minPrice);
          this.totalCount = filteredArray.length;
        }

        if (this.maxPrice) {
          filteredArray = result.data.filter((prod: Product) => prod.price <= this.maxPrice);
          this.totalCount = filteredArray.length;
        }

        if (this.minPrice && this.maxPrice) {
          filteredArray = result.data.filter(
            (prod: Product) => prod.price <= this.maxPrice && prod.price >= this.minPrice,
          );
          this.totalCount = filteredArray.length;
        }

        this.products = this.getProductPage(filteredArray);

        this.loaded = true;
        if (!this.firstLoad) {
          this.firstLoad = true;
        }

        this.utilsService.scrollToPageContent();
      });
    });
  }

  getProductPage(products: Product[]) {
    return products.slice(this.page * this.perPage, this.page * this.perPage + this.perPage);
  }

  paramsSetup() {
    this.productParams = {
      page_index: 0,
      page_size: 1000000,
      sort: [
        this.orderBy === 'default'
          ? undefined
          : this.orderBy === 'title-az' || this.orderBy === 'title-za'
          ? 'title'
          : this.orderBy === 'price-up' || this.orderBy === 'price-down'
          ? 'price'
          : undefined,
      ],
      filter: [],
      sort_direction:
        this.orderBy === 'title-az' || this.orderBy === 'price-up'
          ? 'asc'
          : this.orderBy === 'price-down' || this.orderBy === 'title-za'
          ? 'desc'
          : 'asc',
    };

    if (this.categories.length > 0) {
      this.categories.forEach((catId) => {
        this.productParams.filter.push({
          field: 'category_id',
          value: catId,
        });
      });
    }

    if (this.searchTerm) {
      this.productParams.filter.push({
        field: 'title',
        value: this.searchTerm,
      });
    }
  }

  ngOnInit(): void {
    this.toggle = window.innerWidth <= 991;
  }

  @HostListener('window: resize', ['$event'])
  onResize(event: Event) {
    this.toggle = window.innerWidth <= 991;
  }

  changeOrderBy(event: any) {
    this.router
      .navigate([], {
        queryParams: { orderBy: event.currentTarget.value, page: 1 },
        queryParamsHandling: 'merge',
      })
      .then();
  }

  toggleSidebar() {
    if (document.querySelector('body').classList.contains('sidebar-filter-active'))
      document.querySelector('body').classList.remove('sidebar-filter-active');
    else document.querySelector('body').classList.add('sidebar-filter-active');
  }

  hideSidebar() {
    document.querySelector('body').classList.remove('sidebar-filter-active');
  }
}
