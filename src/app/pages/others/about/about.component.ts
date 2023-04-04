import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { customSay, team, brands } from './about-data';
import { sliderOpt } from '../../../shared/data';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  customSay = customSay;

  brands = brands;

  team = team;

  sliderOption = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
      1200: {
        nav: true,
      },
    },
  };

  teamOption = {
    ...sliderOpt,
    nav: false,
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
