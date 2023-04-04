import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';

import { routeAnimation } from '../data';

@Component({
  selector: 'vio-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewChecked {
  containerClass = 'container';

  isBottomSticky = false;

  current = '/';

  private subscr: Subscription;

  constructor(private router: Router, private changeRef: ChangeDetectorRef) {
    this.subscr = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.current = event.url;
        if (this.current.includes('fullwidth')) {
          this.containerClass = 'container-fluid';
        } else {
          this.containerClass = 'container';
        }

        this.isBottomSticky = this.current.includes('product/default') && window.innerWidth > 991;
      } else if (event instanceof NavigationEnd) {
        this.current = event.url;
        if (this.current.includes('fullwidth')) {
          this.containerClass = 'container-fluid';
        } else {
          this.containerClass = 'container';
        }

        this.isBottomSticky = this.current.includes('product/default') && window.innerWidth > 991;
      }
    });
  }

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  handleKeyDown(event: Event) {
    this.resizeHandle();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.isActivated && outlet.activatedRoute && outlet.activatedRoute.url;
  }

  resizeHandle() {
    this.isBottomSticky = this.current.includes('product/default') && window.innerWidth > 992;
  }
}
