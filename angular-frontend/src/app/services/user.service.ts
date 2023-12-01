import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User.model';
import { Register } from '../models/Register.model';

const API_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL, this.httpOptions);
  }

  getAllDevelopers(): Observable<any> {
    return this.http.get(API_URL + "/devs", this.httpOptions);
  }

  getUserById(userId : string): Observable<any> {
    return this.http.get(API_URL + "/" + userId , this.httpOptions);
  }

  changeRole(userId : string):Observable<any> {
    //console.log(API_URL + "/change-role/" + userId);
    return this.http.put(API_URL + "/change-role/" + userId, null, this.httpOptions);
  }

  saveDeveloper(developerData: Register): Observable<any> {
    return this.http.post(API_URL + "/devs", developerData, this.httpOptions);
  }
}
