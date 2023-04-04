import { Component, Input, OnInit } from '@angular/core';

import { productSlider } from '../data';

@Component({
  selector: 'vio-recent-collection',
  templateUrl: './recent-collection.component.html',
  styleUrls: ['./recent-collection.component.scss'],
})
export class RecentCollectionComponent implements OnInit {
  @Input() products = [];

  @Input() loaded = false;

  sliderOption = productSlider;

  categories = ['all', 'watches', 'bracelets', 'boxes'];

  titles = { all: 'Wszystko', watches: 'Zegarki', bracelets: 'Bransoletki', boxes: 'Pudełka' };

  constructor() {}

  ngOnInit(): void {}
}
