import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  newUsername: string ='';
  newPassword: string ='';
  constructor(private api:ApiService){

  }
  updateUserCredentials(): void {
    this.api.updateUserCredentials(this.newUsername, this.newPassword)
      .subscribe((response: any) => {
        // Handle response, maybe show a success message
        console.log(response);
      }, (error: any) => {
        // Handle error, maybe show an error message
        console.error(error);
      });
  }
}
