import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../../../services/api.service';
import { UtilsService } from '../../../../services/utils.service';
import { Product } from '../../../../classes/product';

@Component({
  selector: 'vio-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss'],
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  products = [];

  searchTerm = '';

  cat = null;

  suggestions: Product[] = [];

  timer: any;

  constructor(
    public activeRoute: ActivatedRoute,
    public router: Router,
    public utilsService: UtilsService,
    public apiService: ApiService,
  ) {}

  ngOnInit(): void {
    document.querySelector('body').addEventListener('click', this.closeSearchForm);
  }

  ngOnDestroy(): void {
    document.querySelector('body').removeEventListener('click', this.closeSearchForm);
  }

  searchProducts(event: any) {
    this.searchTerm = event.target.value;
    if (this.searchTerm.length > 2) {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.apiService
          .fetchAllProducts({
            page_index: 0,
            page_size: 5,
            filter: [
              {
                field: 'html_title',
                value: this.searchTerm,
              },
            ],
            sort: [],
            sort_direction: 'asc',
          })
          .subscribe((result) => {
            this.suggestions = [...result.data];
          });
      }, 500);
    } else {
      window.clearTimeout(this.timer);
      this.suggestions = [];
    }
  }

  matchEmphasize(name: string) {
    const regExp = RegExp(this.searchTerm, 'i');
    return name.replace(regExp, (match) => '<strong>' + match + '</strong>');
  }

  goProductPage() {
    this.searchTerm = '';
    this.suggestions = [];
    const inputElement: any = document.querySelector('.header-search .form-control');
    inputElement.value = '';
    this.closeSearchForm();
  }

  showSearchForm(e: Event) {
    document.querySelector('.header .header-search').classList.add('show');
    e.stopPropagation();
  }

  closeSearchForm() {
    document.querySelector('.header .header-search').classList.remove('show');
  }

  submitSearchForm(e: Event) {
    e.preventDefault();
    this.router
      .navigate(['/shop/sidebar/3cols'], { queryParams: { searchTerm: this.searchTerm } })
      .then();
  }
}
