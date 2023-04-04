import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryPageComponent } from './gallery/gallery.component';

const routes: Routes = [
  {
    path: ':slug',
    component: GalleryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
