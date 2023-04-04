import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LoginPageComponent } from './login/login.component';
import { FaqsPageComponent } from './faqs/faqs.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactPageComponent } from './contact/contact.component';
import { AuthorizedGuard } from '../../shared/guards/authorized.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: 'faq',
    component: FaqsPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
