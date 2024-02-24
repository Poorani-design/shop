import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  @Output() onEditProduct: EventEmitter<any> = new EventEmitter<any>();
  productList:any =[];
  constructor(private api:ApiService,private form:FormBuilder){
    this.getAllProductList();
  }
  getAllProductList(){
    this.api.getAllProductList().subscribe((res)=>{
      console.log(res);
      this.productList=res.data;
    })
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
