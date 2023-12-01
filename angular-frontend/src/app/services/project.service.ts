import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Project } from '../models/project.model';
import { Observable, map } from 'rxjs';
import { User } from '../models/User.model';
import { environment } from 'src/environments/environment';

const PROJECT_URL = environment.PROJECT_URL;
const API_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ProjectService{

  currentUser: User = new User;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private authService: AuthService, private http: HttpClient) {
    authService.currentUser.subscribe(data => {
      this.currentUser = data;
      this.httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.currentUser?.token
      })
    });
  }

  saveProject(project: Project): Observable<any> {
    //console.log(this.httpOptions)
    return this.http.post(PROJECT_URL, project, this.httpOptions);
  }

  updateProject(project: Project): Observable<any> {
   
    return this.http.put(PROJECT_URL, project, this.httpOptions);
  }  

  getAllUsersProjects(): Observable<any> {
    return this.http.get(PROJECT_URL, this.httpOptions);
  }

  getAllProjects(): Observable<any> {
    return this.http.get(PROJECT_URL + "/all", this.httpOptions);
  }

  getProjectsByUserId(userId: string): Observable<any> {
    return this.http.get(PROJECT_URL + "/byUser/" + userId, this.httpOptions);
  }

  getAllNewProjects(): Observable<any> {
    return this.http.get(PROJECT_URL + "/new", this.httpOptions);
  }

}
