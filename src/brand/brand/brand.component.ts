import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.css',
})
export class BrandComponent {
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  fileName: string = '';

  brandList: any = [];
  brandFile: any;
  form: any;
  getImageFileName: any;
  singleBrandForm: any;
  selectedId: any;
  singleBrandData: any;
  imgSrcUrl: any;
  show: boolean = true;
  updateBrandFile:any;
  newimgSrcUrl:any;
  constructor(private api: ApiService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) {
    this.getAllBrandList();

    this.form = this.formBuilder.group({
      brand_name: ['', Validators.required],
      brand_img: [''],
    });
    this.singleBrandForm = this.formBuilder.group({
      brand_name: [''],
      new_brand_img: [''],
    });
  }
  getAllBrandList() {
    this.api.getBrandApi().subscribe((res) => {
      this.brandList = res.data;
    });
  }
  
  addBrand() {
    const formData = new FormData();
    formData.append('brand_name', this.form.value.brand_name);

    const fileInput = document.getElementById('brandimg') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('brand_image', fileInput.files[0]);
    }

    this.api.addBrandApi(formData).subscribe(
      (res) => {
        console.log('Data added:', res);
        this.form.reset(); // Reset the form if needed
        // Clear the file input value
      if (fileInput) {
        fileInput.value = '';
      }
        this.getAllBrandList();
      },
      (error) => {
        console.error('Error adding brand:', error);
        // Handle error here
      }
    );
  }

  getSelectBrandId(brand_id: any) {
    this.selectedId = brand_id;
    console.log(this.selectedId);
    
    this.api.getSingleBrand(this.selectedId).subscribe((res) => {
      console.log(res);
      // to get brand data and stored in array form
      this.singleBrandData = res.data[0];
      // patch value for edit form -- start here
      console.log(this.singleBrandData.brand_img, 'brand_img');
      // get image file name for patch the file name
      this.getImageFileName = this.singleBrandData.brand_img;
      const fileInput = document.getElementById(
        'new_brand_img'
      ) as HTMLInputElement;
      this.getImageFileName = fileInput;
      console.log("selected brand img file name", this.getImageFileName);
      
      this.patchSingleBrand();
      
      // patch value for edit form -- end here
    });
    this.show = false;
  }
  patchSingleBrand() {
    this.singleBrandForm.patchValue({
      brand_name: this.singleBrandData.brand_name,
      new_brand_img: this.singleBrandData.brand_img || '',
    });
    console.log(this.singleBrandForm.value);    
    this.getImageUrl();
  }

  getImageUrl(): string {
    this.imgSrcUrl = `../../assets/uploads/brands/${this.singleBrandForm.value.new_brand_img}`;
    return this.imgSrcUrl;
  }
  onUpdateBrandFile(event: any): void {
    const file: File = event.target.files[0];
    this.imgSrcUrl='';
    this.newimgSrcUrl='';
    this.previewImage(file);
    this.updateBrandFile=file;
    this.fileName = file ? file.name : '';
    this.fileSelected.emit(file);
    console.log(file)
    this.singleBrandForm.patchValue({
      new_brand_img: this.fileName ,
    });

  }
  previewImage(file:File): void { 
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      this.newimgSrcUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      console.log(this.newimgSrcUrl);
    };
  
    reader.readAsDataURL(file);
  }
  updateBrand() {
    const formData = new FormData();
    formData.append('brand_name', this.singleBrandForm.value.brand_name);
    formData.append('new_brand_img', this.updateBrandFile || this.getImageFileName); // Updated image file  
    this.api.updatesingleBrand(formData, this.selectedId).subscribe((res) => {
      console.log(res, 'updated success');
      this.getAllBrandList();
    });
  }
  deleteBrand(brand_id:any){
    this.api.deleteSingleBrand(brand_id).subscribe((res)=>{
      console.log(res);
      console.log("deleted brand data id :", brand_id);
      this.getAllBrandList();
    })
  } 
}
