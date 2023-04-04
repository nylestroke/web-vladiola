import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { OwlModule } from 'angular-owl-carousel';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { GalleryPageComponent } from './gallery/gallery.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { InfoComponent } from './shared/info/info.component';

import { RelatedProductsComponent } from './shared/related-products/related-products.component';
import { DetailComponent } from './shared/details/detail.component';

@NgModule({
  declarations: [
    GalleryPageComponent,
    GalleryComponent,
    DetailComponent,
    InfoComponent,
    RelatedProductsComponent,
  ],

  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    RouterModule,
    NgbModule,
    OwlModule,
    LightboxModule,
  ],

  exports: [],

  providers: [NgbModal],
})
export class ProductModule {}
