import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Login } from 'src/app/models/Login.model';
import { Register } from 'src/app/models/Register.model';
import { User } from 'src/app/models/User.model';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  faUser = faUserCircle;
  errorMessage: string = "";
  loginData: Login = new Login();
 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue?.userId) {
      this.router.navigate(['/profile']);
      return;
    } 
  }

  login() {
    
    this.authService.login(this.loginData).subscribe(data => {
      this.router.navigate(['/profile']);
    }, err => {
      this.errorMessage = 'Username or password is incorrect.'
      console.log(err);
    });

    //console.log(this.user);

    /*this.authService.login(this.loginData).subscribe(data => {
      //console.log('token   ' + data.headers.get('Token'));
      this.token = data.headers.get('Token');
      this.id = data.headers.get('UserID');
      this.firstName=data.headers.get('firstName');
      console.log("token " + this.token);
      console.log("user id " + this.id);
      console.log("firstName " + this.firstName);
    }, err => {
      console.log(err);
    });  */
   
  }

  


}
