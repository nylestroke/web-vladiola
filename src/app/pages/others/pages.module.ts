import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { OwlModule } from 'angular-owl-carousel';
import { GoogleMapsModule } from '@angular/google-maps';

import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { AboutComponent } from './about/about.component';
import { LoginPageComponent } from './login/login.component';
import { FaqsPageComponent } from './faqs/faqs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactPageComponent } from './contact/contact.component';
import { ComingSoonPageComponent } from './coming-soon/coming-soon.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AboutComponent,
    FaqsPageComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    ContactPageComponent,
    ComingSoonPageComponent,
  ],

  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgbModule,
    RouterModule,
    OwlModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
