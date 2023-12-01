import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Register } from 'src/app/models/Register.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  //user: User = new User();
  registerData: Register = new Register();
  faUser = faUserCircle;
  
  errorMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.currentUserValue?.userId) {
      this.router.navigate(['/profile']);
      return;
    } 
  }

  register() {
    this.authService.register(this.registerData).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      this.errorMessage = 'Unexpected error occurred.'
      console.log(err);
    })
  }

}
