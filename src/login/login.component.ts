import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandComponent } from '../brand/brand/brand.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string ='';
  password: string ='';
  loginError: string | undefined;
  constructor(private api:ApiService,private router:Router){
    if (this.api.isLoggedIn()) {
      this.router.navigate(['']); // Redirect to home page if already logged in
    }
   }
  login() {
    if (this.username && this.password) {
      console.log(this.username, this.password);
      this.api.login(this.username, this.password).subscribe((res) => {
        if (res && res.status == true) {
          this.api.setLoggedIn();
          this.router.navigate(['']);
        } else {
          alert("Username and password are wrong");
        }
      });
    } else {
      this.loginError = "Please enter username and password";
    }
    
  }
}
