import { Component } from '@angular/core';
import { CommonUtilityService } from '../app/common/common-utility.service';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  totalBrandCount:number|undefined;
  totalCategoryCount:number|undefined;
  totalProductCount:number|undefined;
  constructor(private api:ApiService){
   this.getBrandCount();
   this.getCategoryCount();
   this.getProductCount();
  }

  getBrandCount(){
    this.api.getBrandApi().subscribe((res) => {
      this.totalBrandCount=res.data.length;
    });
  }

  getCategoryCount(){
    this.api.getAllCategory().subscribe((res) => {
      this.totalCategoryCount = res.data.length;
    });
  }

  getProductCount(){
    this.api.getAllProductList().subscribe((res)=>{
      console.log(res);
      this.totalProductCount=res.data.length;
    })
  }
 
}
