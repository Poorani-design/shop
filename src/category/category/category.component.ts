import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
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
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  @Output() fileSelected: EventEmitter<File> = new EventEmitter<File>();
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  categoryList: any = [];
  addForm: any;
  singleCategoryForm: any;
  addFile: any;
  addFileNameValidation: any = '';
  selectedEditId: any;
  addFormCategoryValidation: boolean = true;
  singleCategoryData: any;
  singleCategoryFormData: any;
  getCategoryImageFileName: any;
  updateCategoryFile: File|undefined;
  fileName: string = '';
  imagePreviewUrl:any;
  show:boolean=true;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.getAllCategoryList();
    this.addForm = this.formBuilder.group({
      category_name: ['', [Validators.required, Validators.maxLength(1)]],
      category_img: [''],
    });
    this.singleCategoryForm = new FormGroup({
      category_name: new FormControl(),
      new_category_img: new FormControl(),
    });
  }
  checkAddFormValidation() {
    if (this.addForm.get('category_name').value.trim() === '') {
      this.addFormCategoryValidation = false;
      // Show an alert to notify the user
      alert('Please enter a category name.');
    }
  }
  getAllCategoryList() {
    this.api.getAllCategory().subscribe((res) => {
      this.categoryList = res.data;
      console.log('category list');
      console.log(res);
    });
  }

  addCategory() {
    this.checkAddFormValidation();
    if (this.addFileNameValidation == '') {
      alert('Kindly upload a category image file');
    }
    if (this.addFormCategoryValidation && this.addFileNameValidation) {
      const formData = new FormData();
      formData.append('category_name', this.addForm.value.category_name);
      const fileInput = document.getElementById(
        'categoryimgid'
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
        formData.append('category_img', fileInput.files[0]);
      }
      this.api.addCategoryApi(formData).subscribe((res) => {
        console.log(this.addForm.value);
        console.log('data uploaded successfully');
        this.addForm.reset();
        this.getAllCategoryList();
      });
    }
  }
  onChangeFileInAddForm(event: any) {
    const file: File = event.target.files[0];
    console.log('onchange');
    console.log(file);
    this.addFileNameValidation = file.name;
    console.log('file name', this.addFileNameValidation);
    this.fileSelected.emit(file);
  }
  getSingleCategory(category_id: any) {
    this.selectedEditId = category_id;
    this.api.getSingleCategory(category_id).subscribe((res) => {
      console.log('Response data:', res);
      
      // Check if response data and data property exist
      if (res && res.data && res.data.length > 0) {
        this.singleCategoryData = res.data[0];
        console.log('Single category data:', this.singleCategoryData);
        
        // Patch values into the form
        this.patchSingleCategory();
         // Set the image preview URL for the selected category image
      this.imagePreviewUrl = '../../assets/uploads/category/' + this.singleCategoryData.category_img;
      } else {
        console.log('No category data found in response.');
      }
    }); 
  }
  
  patchSingleCategory() {
    if (this.singleCategoryData) {
      this.singleCategoryForm.patchValue({
        category_name: this.singleCategoryData.category_name || '',
        new_category_img: this.singleCategoryData.category_img|| '',
      });
      console.log('Form values after patching:', this.singleCategoryForm.value);
    } else {
      console.log('No category data available to patch into the form.');
    }
  }

  onUpdateCategoryFile(event: any): void {
     const file: File = event.target.files[0];
    this.updateCategoryFile = file;
    this.fileName = file ? file.name : '';
    this.fileSelected.emit(file);
    // Read the selected image file and set the image preview URL
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result;
    };
    reader.readAsDataURL(file);
    console.log('Selected file:', file);
    console.log('File name:', this.fileName);
    this.singleCategoryForm.patchValue({
      new_category_img: this.updateCategoryFile,
    });
    console.log("after patching", this.singleCategoryForm.value.new_category_img)
  }
  deleteSingleCategory(id: any) {
    this.api.deleteSingleCategory(id).subscribe((res) => {
      console.log(res);

      console.log('deleted category');
      this.getAllCategoryList();
    });
  }

  updateSingleCategory():void {
    console.log('update id', this.selectedEditId);
     // Handle form submission, including the selected file
     const formData = new FormData();
     formData.append('category_name', this.singleCategoryForm.value.category_name);
    if(this.updateCategoryFile){
      formData.append('new_category_img', this.updateCategoryFile);
    }
    
    console.log("update file in id", this.singleCategoryForm.value.new_category_img)
     this.api.updatesingleCategory(formData, this.selectedEditId).subscribe((res) => {
      console.log(res, 'updated success');
      this.getAllCategoryList();
      this.imagePreviewUrl = null;
        this.selectedEditId = null;
        
    });
     
  }
}
