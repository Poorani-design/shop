import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
// import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr'; Import the module
import {RouterModule} from '@angular/router';
import { BrandComponent } from '../brand/brand/brand.component';
import { CategoryComponent } from '../category/category/category.component';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [ 
    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppComponent,
    CommonModule,
    // AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    RouterModule,
    CategoryComponent,
    BrandComponent,
    // ToastrModule.forRoot() 
  ],
  bootstrap: []
})
export class AppModule { }
