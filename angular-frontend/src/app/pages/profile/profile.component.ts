import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from 'src/app/models/User.model';
import { ProjectResponse } from 'src/app/models/projectResponse.mode';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  currentUser: User = new User;
  prrojects: ProjectResponse[] = [];
  numberOfProjects: number = 0;

  constructor(private authService: AuthService, private http: HttpClient, private userService: UserService) {
    authService.currentUser.subscribe(data => {
      this.currentUser = data;
      
    });

    console.log(this.currentUser.userId);
    this.userService.getUserById(this.currentUser.userId).subscribe(data => {
      console.log(data);
      this.prrojects = data.projects;
      console.log(this.prrojects);
      //this.numberOfProjects = this.prrojects.length;
    })
  }
}
