import { Component, OnInit, Input } from '@angular/core';
import { productSlider } from '../data';

@Component({
  selector: 'vio-top-collection',
  templateUrl: './top-collection.component.html',
  styleUrls: ['./top-collection.component.scss'],
})
export class TopCollectionComponent implements OnInit {
  @Input() products = [];

  @Input() loaded = false;

  sliderOption = productSlider;

  categories = ['all', 'watches', 'bracelets', 'boxes'];

  titles = { all: 'Wszystko', watches: 'Zegarki', bracelets: 'Bransoletki', boxes: 'Pudełka' };

  constructor() {}

  ngOnInit(): void {}
}
