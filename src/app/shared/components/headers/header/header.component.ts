import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

import { UtilsService } from '../../../services/utils.service';
import { ModalService } from '../../../services/modal.service';
import { CookieService } from '../../../services/cookie.service';
import { ApiService } from '../../../services/api.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'vio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() containerClass = 'container';

  user: any;

  private subscr: Subscription;

  constructor(
    public router: Router,
    public utilsService: UtilsService,
    public modalService: ModalService,
    private cookieService: CookieService,
    private apiService: ApiService,
    private toastrService: ToastrService,
  ) {
    this.subscr = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/') {
          document.querySelector('.header').classList.contains('position-relative') &&
            document.querySelector('.header').classList.remove('position-relative');
        } else {
          document.querySelector('.header').classList.add('position-relative');
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === '/') {
          document.querySelector('.header').classList.contains('position-relative') &&
            document.querySelector('.header').classList.remove('position-relative');
        } else {
          document.querySelector('.header').classList.add('position-relative');
        }
      }
    });

    if (this.authorized()) {
      const token = this.cookieService.getCookie('access_token');
      if (token) {
        const decodedToken: any = jwt_decode(token);
        this.apiService.fetchSingleUser(decodedToken.id).subscribe({
          next: (response) => {
            this.user = response;
          },
          error: () => {
            this.apiService.fetchLogout();
          },
        });
      }
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  showLoginModal(event: Event): void {
    event.preventDefault();
    this.modalService.showLoginModal();
  }

  authorized() {
    return this.cookieService.getCookie('access_token');
  }
}
