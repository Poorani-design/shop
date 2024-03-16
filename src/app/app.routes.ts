import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../service/auth.guard';
// import { AuthGuard } from '../service/auth.guard';
import { BrandComponent } from '../brand/brand/brand.component';
import { CategoryComponent } from '../category/category/category.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { ProductComponent } from '../product/product/product.component';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order/order.component';
import { SettingComponent } from './setting/setting/setting.component';

export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'Home', component: DashboardComponent },
      { path: 'Category', component: CategoryComponent },
      { path: 'Brand', component: BrandComponent },
      { path: 'Product', component: ProductComponent },
      { path: 'Order', component: OrderComponent },
      { path: 'Setting', component: SettingComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
