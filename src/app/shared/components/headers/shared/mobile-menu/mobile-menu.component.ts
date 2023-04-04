import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { CookieService } from '../../../../services/cookie.service';

declare var $: any;

@Component({
  selector: 'vio-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  searchTerm = '';

  private subscr: Subscription;

  constructor(private router: Router, private cookieService: CookieService) {
    this.subscr = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.hideMobileMenu();
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  submenuToggle(e) {
    const parent: HTMLElement = e.target.closest('li');
    const submenu: HTMLElement = parent.querySelector('ul');

    if (parent.classList.contains('open')) {
      $(submenu).slideUp(300, function () {
        parent.classList.remove('open');
      });
    } else {
      $(submenu).slideDown(300, function () {
        parent.classList.add('open');
      });
    }

    e.preventDefault();
    e.stopPropagation();
  }

  hideMobileMenu() {
    document.querySelector('body').classList.remove('mmenu-active');
    document.querySelector('html').removeAttribute('style');
  }

  submitSearchForm(e: any) {
    e.preventDefault();
    this.searchTerm = e.currentTarget.querySelector('.form-control').value;
    this.router.navigate(['/shop'], { queryParams: { searchTerm: this.searchTerm } }).then();
  }

  authorized() {
    return this.cookieService.getCookie('access_token');
  }
}
