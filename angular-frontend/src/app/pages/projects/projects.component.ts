import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectSaveComponent } from 'src/app/components/project-save/project-save.component';
import { ProjectUpdateComponent } from 'src/app/components/project-update/project-update.component';
import { User } from 'src/app/models/User.model';
import { Project } from 'src/app/models/project.model';
import { ProjectResponse } from 'src/app/models/projectResponse.mode';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  newProjectList: Array<ProjectResponse> = [];
  inProgressProjectList: Array<ProjectResponse> = [];
  canceledProjectList: Array<ProjectResponse> = [];
  tabs: string[] =['New', 'In Progress', 'Canceled'];
  activatedTabIndex: number = 0;

  selectedProject: ProjectResponse = new ProjectResponse();
  errorMessage: string = "";

  @ViewChild(ProjectSaveComponent) saveComponent: ProjectSaveComponent | undefined;
  @ViewChild(ProjectUpdateComponent) updateComponent: ProjectUpdateComponent | undefined;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    /*this.projectService.getAllProjects().subscribe(data => {
      this.projectList = data;
      console.log(data);
    })*/
    this.updateList();
  }

  updateList() {
    this.projectService.getAllUsersProjects().subscribe(data => {
      this.newProjectList = data;
      this.inProgressProjectList = data;
      this.canceledProjectList = data;
      this.newProjectList = this.newProjectList.filter(p => p.status === 'NEW');
      this.inProgressProjectList = this.inProgressProjectList.filter(p => p.status === 'ASSIGNED');
      this.canceledProjectList = this.canceledProjectList.filter(p => p.status === 'CANCELED');
      console.log(data);
    })
  }

  createProjectRequest() {
    //this.selectedProject = new Project();
    this.saveComponent?.showProjectSaveModal();
  }

  editProjectRequest(item: ProjectResponse) {
    this.selectedProject = Object.assign({}, item);
    this.updateComponent?.showProjectUpdateModal();
  }

  saveProjectWatcher(project: Project) {
    this.updateList();
  }

  editProjectWatcher(project: Project) {
    this.updateList();
  }

 tabChange(tabIndex: number){
  
  this.activatedTabIndex = tabIndex;
 }

}
