import { Component, OnInit } from '@angular/core';

import { ModalService } from '../../../shared/services/modal.service';
import { ApiService } from '../../../shared/services/api.service';
import { UtilsService } from '../../../shared/services/utils.service';

import { featureSlider, instagramSlider, introSlider } from '../data';
import { findUniqueProducts } from '../../../shared/helpers/unique';
import { Router } from '@angular/router';

declare global {
  interface Array<T> {
    random(count: number): Array<T>;
  }
}

if (!Array.prototype.random) {
  Array.prototype.random = function <T>(this: T[], count: number): T[] {
    const array = [...this];
    let distinct = [];

    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * array.length - 1);
      distinct.push(array[idx]);
      array.splice(idx, 1);
    }

    return distinct;
  };
}

@Component({
  selector: 'vio-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  bannerStyles: string[] = [];

  usedNums: number[] = [];

  products = [];

  randomProducts = [];

  newProducts = [];

  featuredProducts = [];

  loaded = false;

  introSlider = introSlider;

  constructor(
    public apiService: ApiService,
    public utilsService: UtilsService,
    private modalService: ModalService,
  ) {
    this.modalService.openNewsletter();

    this.apiService
      .fetchAllProducts({
        page_index: 0,
        page_size: 100000,
        sort: [],
        filter: [],
        sort_direction: 'asc',
      })
      .subscribe({
        next: (result) => {
          this.products = findUniqueProducts(result.data);
          this.newProducts = this.products.random(300);
          this.featuredProducts = this.products.random(200);
          this.randomProducts = this.products.random(3);
          this.loaded = true;
        },
      });
  }

  random(): number {
    let rand = Math.floor(Math.random() * 9) + 1;
    if (this.usedNums.includes(rand)) {
      rand = Math.floor(Math.random() * 9) + 1;
    }
    this.usedNums.push(rand);
    return rand;
  }

  ngOnInit(): void {
    this.bannerStyles = [
      `background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)), url(${
        'assets/images/banners/vivab2b/' + (Math.floor(Math.random() * 9) + 1) + '.jpg'
      }) no-repeat center`,
      `background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)), url(${
        'assets/images/banners/vivab2b/' + (Math.floor(Math.random() * 9) + 1) + '.jpg'
      }) no-repeat center`,
    ];
  }
}
