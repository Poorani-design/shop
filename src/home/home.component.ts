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
  constructor(private api:ApiService, private router:Router){

  }
  logout(){
    console.log("logout")
    this.api.logout();
    this.router.navigate(['/login']);
  }
}
