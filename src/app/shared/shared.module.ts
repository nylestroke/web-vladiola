import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OwlModule } from 'angular-owl-carousel';
import { LazyLoadImageModule } from 'ng-lazyload-image';

// Header Element
import { CartMenuComponent } from './components/headers/shared/cart-menu/cart-menu.component';
import { WishlistMenuComponent } from './components/headers/shared/wishlist-menu/wishlist-menu.component';
import { MainMenuComponent } from './components/headers/shared/main-menu/main-menu.component';
import { HeaderSearchComponent } from './components/headers/shared/header-search/header-search.component';
import { MobileButtonComponent } from './components/headers/shared/mobile-button/mobile-button.component';
import { MobileMenuComponent } from './components/headers/shared/mobile-menu/mobile-menu.component';

// Header Component
import { HeaderComponent } from './components/headers/header/header.component';

// // Product Component
import { ProductHelperComponent } from './components/product/product-helper/product-helper.component';
import { ProductNormalComponent } from './components/product/product-normal/product-normal.component';
import { ProductSmallComponent } from './components/product/product-small/product-small.component';

// Footer Component
import { FooterComponent } from './components/footer/footer.component';
// // Page Element
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/accordion/card/card.component';
import { AccordionComponent } from './components/accordion/accordion.component';

// Product Element
import { QuantityInputComponent } from './components/quantity-input/quantity-input.component';
import { CountDownComponent } from './components/count-down/count-down.component';

// // single use component
import { QuickViewComponent } from './components/modals/quick-view/quick-view.component';
import { NewsletterModalComponent } from './components/modals/newsletter-modal/newsletter-modal.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { IsotopeGridComponent } from './components/isotope-grid/isotope-grid.component';
import { ImageComponent } from './components/image/image.component';

// // Custom Directives
import { BgParallaxDirective } from './directives/bg-parallax.directive';
import { TabClickDirective } from './directives/custom-tab-click.directive';
import { ProductHoverDirective } from './directives/product-hover.directive';
import { ContentAnimDirective } from './directives/content-anim.directive';

// Pipes
import { CatFilterPipe } from './pipes/cat-filter.pipe';
import { SafeContentPipe } from './pipes/safe-content.pipe';

// Form Components
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';

@NgModule({
  declarations: [
    // header
    CartMenuComponent,
    WishlistMenuComponent,
    MainMenuComponent,
    HeaderSearchComponent,
    MobileButtonComponent,
    MobileMenuComponent,

    HeaderComponent,
    FooterComponent,

    // product
    ProductHelperComponent,
    ProductNormalComponent,
    ProductSmallComponent,

    // single-use components
    BreadcrumbComponent,
    PageHeaderComponent,
    QuickViewComponent,
    QuickViewComponent,
    NewsletterModalComponent,
    LoginModalComponent,
    QuantityInputComponent,
    CountDownComponent,
    AccordionComponent,
    CardComponent,
    PaginationComponent,
    IsotopeGridComponent,
    ImageComponent,

    // directives
    BgParallaxDirective,
    TabClickDirective,
    ProductHoverDirective,
    ContentAnimDirective,

    // pipes
    CatFilterPipe,
    SafeContentPipe,
    CountDownComponent,

    // form components
    LoginLayoutComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    TranslateModule,
    OwlModule,
    LazyLoadImageModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  exports: [
    // header
    HeaderComponent,

    // mobile-menus
    MobileMenuComponent,

    // footer
    FooterComponent,

    // products
    ProductHelperComponent,
    ProductNormalComponent,
    ProductSmallComponent,

    // // single-use components
    BreadcrumbComponent,
    PageHeaderComponent,
    CountDownComponent,
    AccordionComponent,
    CardComponent,
    PaginationComponent,
    QuantityInputComponent,
    IsotopeGridComponent,
    ImageComponent,

    // directives
    BgParallaxDirective,
    TabClickDirective,
    ProductHoverDirective,
    ContentAnimDirective,

    // pipes
    CatFilterPipe,
    SafeContentPipe,

    // forms
    LoginLayoutComponent,
    ReactiveFormsModule,
  ],

  entryComponents: [
    QuickViewComponent,
    QuickViewComponent,
    NewsletterModalComponent,
    LoginModalComponent,
  ],
})
export class SharedModule {}
