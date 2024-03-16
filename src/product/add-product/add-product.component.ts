import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonUtilityService } from '../../app/common/common-utility.service';
import { ApiService } from '../../service/api.service';
import { Category } from '../../app/interface/category';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  @Output() productAdded: EventEmitter<any> = new EventEmitter<any>();
  categoryList:any=[];
  brandList:any=[];
  addProductForm: any;
  constructor(private formBuilder:FormBuilder,private api:ApiService,private common:CommonUtilityService){
    this.addProductForm = this.formBuilder.group({
      product_name: ['', [Validators.required, Validators.maxLength(1)]],
      product_price: ['', [Validators.required, Validators.maxLength(1)]],
      product_offer_price: ['', [Validators.required, Validators.maxLength(1)]],
      product_category_id: ['', [Validators.required, Validators.maxLength(1)]],
      product_brand_id: ['', [Validators.required, Validators.maxLength(1)]],
      product_img: [''],      
      product_stock_quantity: ['', [Validators.required, Validators.maxLength(1)]],
      product_description: ['', [Validators.required, Validators.maxLength(1)]],
      product_remarks: ['', [Validators.required, Validators.maxLength(1)]],
    });
    this.toGetCategoryBrand();
  }
  toGetCategoryBrand(){
    this.common.getCategoryList().subscribe((categoryList) => {
      this.categoryList = categoryList;
      console.log(this.categoryList);
    });

    this.common.getBrandList().subscribe((brandList) => {
      this.brandList = brandList;
      console.log(this.brandList);
     });
  }


  onChangeFileInAddForm(event:any){
    const file = event.target.files[0];
    this.addProductForm.patchValue({
      product_img: file
    });
    this.addProductForm.get('product_img').updateValueAndValidity();
  }
  addProduct() {
   
      const formData = new FormData();

      Object.keys(this.addProductForm.value).forEach(key => {
        formData.append(key, this.addProductForm.value[key]);
      });
      console.log(this.addProductForm.value.product_name)
      this.api.addProductApi(formData).subscribe((res) => {
        console.log('Product added successfully:', res);
        this.productAdded.emit(); // Emit event upon successful addition
        this.addProductForm.reset();
        
      }, error => {
        console.error('Error adding product:', error);
      });
    } 
  

}
