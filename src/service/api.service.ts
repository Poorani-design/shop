import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  
  private isAuthenticated: boolean = false;

  post<T>(arg0: string, arg1: { username: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router:Router) {
    this.getBrandApi();
  }

  //======================================= brand START HERE ======================
  // get all brand list
  //get brand data
  getBrandApi(): Observable<any> {
    return this.http.get(`${this.apiUrl}/brand`);
  }
  //add brand data
  addBrandApi(data: any): Observable<any> {
    console.log('uploading data printing ==>');
    console.log(data);
    return this.http.post(`${this.apiUrl}/addBrand`, data);
  }
  //get single brand data
  getSingleBrand(brand_id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/getSingleBrand/${brand_id}`);
  }
  //update single brand data
  updatesingleBrand(data: any, id: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateSingleBrand/${id}`, data);
  }
  //delete single brand data
  deleteSingleBrand(id:any){
    return this.http.delete(`${this.apiUrl}/deleteSingleBrand/${id}`);
  }

  // =========================== category query start =============

   //get category data
   getAllCategory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/category`);
  }
   //add category data
   addCategoryApi(data: any): Observable<any> {
    console.log('uploading data printing ==>');
    console.log(data);
    return this.http.post(`${this.apiUrl}/addCategory`, data);
  }

    //delete single category data
    deleteSingleCategory(category_id:any){
      return this.http.delete(`${this.apiUrl}/deleteSingleCategory/${category_id}`);
    }

    //get single category data
    getSingleCategory(category_id:any):Observable<any>{
      return this.http.get(`${this.apiUrl}/getSingleCategory/${category_id}`)
    }
    //update single brand data
    updatesingleCategory(data: any, id: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/updateSingleCategory/${id}`, data);
    }
    // ============================ product api start ========================

     //get product data
   getAllProductList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/product`);
  }
   //add product data
   addProductApi(data: any): Observable<any> {
    console.log('uploading data printing ==>');
    console.log(data);
    return this.http.post(`${this.apiUrl}/addProduct`, data);
  }
  getSelectedProduct(product_id:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/getSingleProduct/${product_id}`)
  }
  //delete single product data
  deleteSingleProduct(product_id:any){
    return this.http.delete(`${this.apiUrl}/deleteSingleProduct/${product_id}`);
  }

  //update product data
  updateSingleProduct(data:any,product_id:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/updateSingleProduct/${product_id}`, data);
  }

  //get user data
  login(username:any, password:any):Observable<any>{
    return this.http.get(`${this.apiUrl}/user/${username}/${password}`)
  }
  updateUserCredentials(newUsername: string, newPassword: string): Observable<any> {
    // Assuming you have some kind of authentication mechanism to get the user ID
    const userId = this.getUserId(); // Implement this function as per your application's authentication

    return this.http.put(`${this.apiUrl}/user/${userId}`, { newUsername, newPassword });
  }
  private getUserId(): any {
    // Implement your logic to get the user ID, maybe from local storage, token, etc.
    // This is just a placeholder, you need to replace it with your actual implementation
    return 'user123';
  }
  
  setLoggedIn(): void {
    this.isAuthenticated = true;
    localStorage.setItem('user', 'true'); // Store authentication state
  }

  logout(): void {
    localStorage.removeItem('user'); // Remove authentication state
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    // Check if the user is logged in based on stored authentication state
    return !!localStorage.getItem('user');
  }


}
