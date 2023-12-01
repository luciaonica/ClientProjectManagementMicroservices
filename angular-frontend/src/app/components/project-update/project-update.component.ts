import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

declare var $: any;

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent {

  errorMessage: string = "";

  @Input() project: Project = new Project;
  @Output() update = new EventEmitter<any>();

  constructor(private projectService: ProjectService){}

  updateProject() {
    this.projectService.updateProject(this.project).subscribe(data => {
      this.update.emit(data);
      $('#projectUpdateModal').modal('hide');
    }, err => {
      this.errorMessage = 'Unexpected error occurred.'
      console.log(err);
    });
  }

  showProjectUpdateModal() {
    $('#projectUpdateModal').modal('show');
  }
}
