import { Component } from '@angular/core';
import { Register } from 'src/app/models/Register.model';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

declare var $:any;

@Component({
  selector: 'app-developer-save',
  templateUrl: './developer-save.component.html',
  styleUrls: ['./developer-save.component.css']
})
export class DeveloperSaveComponent {

  developerData: Register = new Register();
  errorMessage: string = "";

  constructor(private userService: UserService){}

  saveDeveloper() {
    this.userService.saveDeveloper(this.developerData).subscribe(data => {
      console.log(data);
      $('#developerModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.'
      console.log(err);
    })
  }

  showDeveloperModal() {
    $('#developerModal').modal('show');
  }

}
