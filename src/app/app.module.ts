import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'angular-owl-carousel';
import localePl from '@angular/common/locales/pl';

// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/others/pages.module';
import { HomeModule } from './pages/home/home.module';

// reducers
import { appReducers, metaReducers } from './core/reducers/app.reducer';
import { wishlistReducer } from './core/reducers/wishlist.reducer';
import { compareReducer } from './core/reducers/compare.reducer';
import { cartReducer } from './core/reducers/cart.reducer';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { registerLocaleData } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    OwlModule,
    PagesModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      enableHtml: true,
      maxOpened: 5,
      progressAnimation: 'increasing',
      closeButton: false,
    }),
    StoreModule.forRoot(appReducers, { metaReducers }),
    StoreModule.forFeature('cart', cartReducer),
    StoreModule.forFeature('wishlist', wishlistReducer),
    StoreModule.forFeature('compare', compareReducer),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    registerLocaleData(localePl);
  }
}
