import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { NouisliderModule } from 'ng2-nouislider';

import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { SidebarPageComponent } from './sidebar/sidebar.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopSidebarComponent } from './shared/sidebar/shop-sidebar/shop-sidebar.component';
import { ShopListComponent } from './shared/list/shop-list/shop-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarPageComponent,
    CartComponent,
    WishlistComponent,
    CheckoutComponent,
    DashboardComponent,
    ShopSidebarComponent,
    ShopListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    RouterModule,
    NgbModule,
    OwlModule,
    NouisliderModule,
    FormsModule,
  ],
})
export class ShopModule {}
