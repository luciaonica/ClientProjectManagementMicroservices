import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/User.model';
import { AuthService } from './services/auth.service';
import { Role } from './models/role.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  currentUser: User = new User;

  constructor(private authService: AuthService, private router: Router){
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  isUser() {
    return this.currentUser?.role === Role.USER;
  }

  isDeveloper() {
    return this.currentUser?.role === Role.DEVELOPER;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
