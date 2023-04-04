import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../../../shared/classes/product';
import { sliderOpt } from '../../../../shared/data';

@Component({
  selector: 'product-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() product: Product;

  @Input() loaded = false;

  options = {
    ...sliderOpt,
    nav: true,
    dots: false,
    items: 3,
    margin: 20,
    loop: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
