import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vio-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  @Input() products = [];

  @Input() loaded = false;

  fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() {}

  ngOnInit(): void {}
}
