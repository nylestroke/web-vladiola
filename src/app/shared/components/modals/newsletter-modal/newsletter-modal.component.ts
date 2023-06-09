import { Component, OnInit } from '@angular/core';
import Cookie from 'js-cookie';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'vio-newsletter-modal',
  templateUrl: './newsletter-modal.component.html',
  styleUrls: ['./newsletter-modal.component.scss'],
})
export class NewsletterModalComponent implements OnInit {
  checkState = false;

  constructor(private modalService: NgbActiveModal) {}

  ngOnInit(): void {}

  changeCheck() {
    this.checkState = !this.checkState;
  }

  closeModal() {
    this.modalService.dismiss();
    this.checkState && Cookie.set(`hideNewsletter`, 'true', { expires: 7 });
  }
}
