import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login } from '../models/Login.model';
import { Register } from '../models/Register.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';
import { map } from 'rxjs/operators';
import { Role } from '../models/role.enum';

const API_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: Login): Observable<any> {
    console.log("service called");
    return this.http.post<any>(API_URL + '/login', user, { observe: 'response' }).pipe(
      map((res: HttpResponse<any>) => {

        const firstName = res.headers.get('firstName');
        const lastName = res.headers.get('lastName');
        const email = res.headers.get('email');
        const userId = res.headers.get('UserId');
        const token = res.headers.get('Token');
        const role = res.headers.get('role') === 'ADMIN' ? Role.ADMIN : res.headers.get('role') === 'USER' ? Role.USER : Role.DEVELOPER;

        if (token && userId && email && firstName && lastName && role) {
          const user: User = { userId, email, firstName, lastName, token, projects: [], role }
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          return null;
        }
      })
    )
  }

  register(registerData: Register): Observable<any> {
    return this.http.post(API_URL, registerData);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User);
  }
}
