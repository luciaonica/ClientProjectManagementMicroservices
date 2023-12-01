import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { ProjectResponse } from 'src/app/models/projectResponse.mode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  projects: ProjectResponse[] = [];
  userId: string | null = "";
  user: User = new User();

  constructor(private route: ActivatedRoute, private userService: UserService){
    
  }
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    this.userId && this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

}
