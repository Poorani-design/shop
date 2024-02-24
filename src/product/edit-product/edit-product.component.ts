import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent {
  
  @Input() editProductId: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  singleProductForm: any;
  singleProductData: any;
  imagePreviewUrl: any;
  updateProductFile: any;
  productImageName:any;
  fileName: any;
  selectedProductId:any;
  constructor(private api: ApiService, private formBuilder: FormBuilder) {
    this.singleProductForm = new FormGroup({
      product_name: new FormControl(),
      product_price: new FormControl(),
      product_offer_price: new FormControl(),
      product_category_id: new FormControl(),
      product_brand_id: new FormControl(),
      product_img: new FormControl(),
      product_stock_quantity: new FormControl(),
      product_description: new FormControl(),
      product_remarks: new FormControl(),
    });
  }
  getSelectedProduct() {
    console.log('in edit product component', this.editProductId);
    this.api.getSelectedProduct(this.editProductId).subscribe((res) => {
      console.log('Response data:', res);
      // productImageName for fetch name from select query
      this.productImageName=res.data[0].product_img;
      // Check if response data and data property exist
      if (res && res.data && res.data.length > 0) {
        this.singleProductData = res.data[0];
        console.log('Single category data:', this.singleProductData);

        // Patch values into the form
        this.patchSingleProduct();
        // Set the image preview URL for the selected category image
        this.imagePreviewUrl =
          '../../assets/uploads/products/' + this.singleProductData.product_img;
      } else {
        console.log('No category data found in response.');
      }
    });
  }
  patchSingleProduct() {
    if (this.singleProductData) {
      this.singleProductForm.patchValue({
        product_name: this.singleProductData.product_name || '',
        product_price: this.singleProductData.product_price || '',
        product_offer_price: this.singleProductData.product_offer_price || '',
        product_category_id: this.singleProductData.product_category_id || '',
        product_brand_id: this.singleProductData.product_brand_id || '',
        product_stock_quantity: this.singleProductData.product_stock_quantity || '',
        product_description: this.singleProductData.product_description || '',
        product_remarks: this.singleProductData.product_remarks || '',
        new_product_img: this.productImageName || this.fileName,
      });
      console.log('Form values after patching:', this.singleProductForm.value);
    } else {
      console.log('No category data available to patch into the form.');
    }
  }

  onUpdateProductFile(event: any): void {
    const file: File = event.target.files[0];
   this.updateProductFile = file;
   this.fileName = file ? file.name : '';
   // Read the selected image file and set the image preview URL
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreviewUrl = reader.result;
   };
   reader.readAsDataURL(file);
  //  while onchange the file, that time fileName is replaced 
   this.productImageName=this.fileName;

 }
 ngOnChanges(changes: SimpleChanges) {
  if (changes['editProductId'] && !changes['editProductId'].firstChange) {
    // Run your select query or perform any other action here
    console.log('Product ID changed:', this.editProductId);
    this.selectedProductId=this.editProductId;
    // Perform your select query or any other action here
    this.getSelectedProduct();
  }
}
updateProduct(){
  const formData = new FormData();
  formData.append('product_name', this.singleProductForm.value.product_name);
  formData.append('product_price', this.singleProductForm.value.product_price);
  formData.append('product_offer_price', this.singleProductForm.value.product_offer_price);
  formData.append('product_category_id', this.singleProductForm.value.product_category_id);
  formData.append('product_brand_id', this.singleProductForm.value.product_brand_id);
  formData.append('product_stock_quantity', this.singleProductForm.value.product_stock_quantity);
  formData.append('product_description', this.singleProductForm.value.product_description);
  formData.append('product_remarks', this.singleProductForm.value.product_remarks);
  formData.append('new_product_img', this.updateProductFile);

  this.singleProductForm.get('product_img').updateValueAndValidity();
  this.api.updateSingleProduct(formData,this.selectedProductId).subscribe((res)=>{
    console.log(res);
  })
}

}

