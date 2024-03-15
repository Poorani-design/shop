import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUtilityService } from '../../app/common/common-utility.service';
import { Category } from '../../app/interface/category';
import { ApiService } from '../../service/api.service';
import { AddProductComponent } from "../add-product/add-product.component";
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
    selector: 'app-product',
    standalone: true,
    templateUrl: './product.component.html',
    styleUrl: './product.component.css',
    imports: [FormsModule, ReactiveFormsModule, CommonModule, AddProductComponent,EditProductComponent]
})
export class ProductComponent {
  editProductId:any;
  brandList:any;
  categoryList:Category[]=[];
  @Output() onEditProduct: EventEmitter<any> = new EventEmitter<any>();
  productList:any =[];
  constructor(private api:ApiService,private form:FormBuilder,private common:CommonUtilityService){
    this.getAllProductList();
    this.toGetBrandCategoryList();
     
  }
  
  toGetBrandCategoryList(){
    
    this.common.getCategoryList().subscribe((categoryList: Category[]) => {
      this.categoryList = categoryList;
      console.log(this.categoryList);
    });

    this.common.getBrandList().subscribe((brandList: any) => {
      this.brandList = brandList;
      console.log(this.brandList);
     });
  }
  //to get all product data
  getAllProductList(){
    this.api.getAllProductList().subscribe((res)=>{
      console.log(res);
      this.productList=res.data;
    });
  }
  
   // to get category name instead of category id
   getCategoryName(categoryId: number): string {
   const category = this.categoryList.find(cat => cat.category_id == categoryId);
    return category ? category.category_name :'';
  }

   
   // to get category name instead of category id
   getProductName(brandId: number): string {
    const brand = this.brandList.find((brands: { brand_id: number; }) => brands.brand_id == brandId);
     return brand ? brand.brand_name :'';
   }
 

   // Event handler for product added event
   onProductAdded() {
    this.getAllProductList(); // Refresh product list
  }
  // delete the product
  deleteSingleProduct(id:any){
      this.api.deleteSingleProduct(id).subscribe((res)=>{
        console.log(res);
        this.getAllProductList();
      })
  }
  editSingleProduct(id:any){
    console.log("selected edit id");
    console.log("edit single id was",id)
    this.editProductId=id;
    this.editProductId.emit;
  
  }
 
}
