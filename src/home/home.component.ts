import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {  HttpClientModule } from '@angular/common/http';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink,RouterLinkActive,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeLink: string = ''; 
  sidebarLinks: string[] = ['Home', 'Brand', 'Category', 'Product', 'Order', 'Setting']; // List of sidebar links

  constructor(private api:ApiService, private router:Router){

  }
  setActiveLink(link: string): void {
    console.log(link)
    this.activeLink = link;
  }
  logout(){
    console.log("logout")
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
