import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

declare var $: any;

@Component({
  selector: 'app-project-save',
  templateUrl: './project-save.component.html',
  styleUrls: ['./project-save.component.css']
})
export class ProjectSaveComponent {

  errorMessage: string = "";
  project: Project = new Project();

  @Output() save = new EventEmitter<any>();

  constructor(private projectService: ProjectService){}

  saveProject() {
    this.projectService.saveProject(this.project).subscribe(data => {
      this.save.emit(data);
      $('#projectSaveModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.'
      console.log(err);
    });
  }
  
  showProjectSaveModal() {
    this.project = new Project();
    $('#projectSaveModal').modal('show');
  }

}
