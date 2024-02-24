import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from '../brand/brand/brand.component';
import { CategoryComponent } from '../category/category/category.component';
import { HomeComponent } from '../home/home.component';
import { ProductComponent } from '../product/product/product.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'brand',
    component: BrandComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
