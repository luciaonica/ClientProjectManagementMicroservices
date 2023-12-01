import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { DeveloperSaveComponent } from 'src/app/components/developer-save/developer-save.component';
import { User } from 'src/app/models/User.model';
import { ProjectResponse } from 'src/app/models/projectResponse.mode';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  usersList: Array<User> = [];
  developersList: Array<User> = [];
  projectList: Array<ProjectResponse> = [];
  errorMessage: string = "";
  selectedUser: User = new User();
  prrojects: ProjectResponse[] = [];
  leftArrow = faCircleChevronLeft;
  rightArrow = faCircleChevronRight;
  autoplayInterval: any;
  activatedTab : string = 'users';

  @ViewChild(DeveloperSaveComponent) saveDeveloper: DeveloperSaveComponent | undefined;

  constructor(private userService: UserService, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    /*this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
      console.log(data);
    })*/
    this.updateList();
    

  }

  

  updateList() {
    this.userService.getAllUsers().subscribe(data => {
      this.usersList = data;
      //this.usersList = this.usersList.filter(user => user.role === Role.USER)
      console.log(data);
    });

    this.userService.getAllDevelopers().subscribe(data => {
      this.developersList = data;
      //this.usersList = this.usersList.filter(user => user.role === Role.USER)
      console.log(data);
    });

    this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
      //this.usersList = this.usersList.filter(user => user.role === Role.USER)
      console.log(data);
    });
  }

  viewUserDetails(userId: string) {
    //console.log(userId);
    //this.userService.getUserById(userId).subscribe(data => {
      //console.log(data);
     // this.prrojects = data.projects;
      //console.log(this.prrojects);
    //})
    //this.router.navigate(['/user-details/'+ userId]);

    this.projectService.getAllNewProjects().subscribe(data => {
      console.log(data);
      
    })
    
  }

  changeRole(userId: string) {
    this.userService.changeRole(userId).subscribe(response => {
      // Handle the response if needed
      //console.log(response);
      console.log('Role changed successfully');
      this.updateList();
    }, error => {
      // Handle errors if any
      console.error('Error changing role:', error);
    });
    //console.log(userId);
  }

  createDeveloperRequest() {
    this.saveDeveloper?.showDeveloperModal();
  }

  changeTab(selectedTab: string) {
    this.activatedTab = selectedTab;
  }

}
