import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiService } from '../../service/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilityService {
  private brandListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private categoryListSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  constructor(private api: ApiService) {
    console.log('Common Utility Service initialized');
    this.fetchBrandList();
    this.fetchCategoryList();
  }

  getBrandList(): Observable<any[]> {
    return this.brandListSubject.asObservable();
  }

  getCategoryList(): Observable<any[]> {
    return this.categoryListSubject.asObservable();
  }

  private fetchBrandList() {
    this.api.getBrandApi().subscribe((res) => {
      this.brandListSubject.next(res.data);
    });
  }

  private fetchCategoryList() {
    this.api.getAllCategory().subscribe((res) => {
      this.categoryListSubject.next(res.data);
    });
  }
}
