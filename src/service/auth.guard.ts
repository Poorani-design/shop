// auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) {}

  canActivate(): boolean {
    if (this.api.isLoggedIn() || localStorage.getItem('user')) {
        console.log("User is authenticated");
        return true;
    } else {
      console.log("User is not authenticated, redirecting to login");
      this.router.navigate(['/login']);
      return false;
    }
  }
}
