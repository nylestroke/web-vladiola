import { Component, OnInit, Input } from '@angular/core';

import { Product } from '../../classes/product';

@Component({
  selector: 'vio-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() prev: Product;

  @Input() next: Product;

  @Input() current: string;

  @Input() fullWidth = false;

  constructor() {}

  ngOnInit(): void {}
}
