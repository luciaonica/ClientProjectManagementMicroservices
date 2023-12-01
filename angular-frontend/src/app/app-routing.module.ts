import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { Role } from './models/role.enum';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { DeveloperComponent } from './pages/developer/developer.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN, Role.USER, Role.DEVELOPER] }
  },

  {
    path: 'developer',
    component: DeveloperComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.DEVELOPER] }
  },

  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.USER] }
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN] }
  },

  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [AuthGuardService],
    data: { roles: [Role.ADMIN] }
  },

  { path: '404', component: NotFoundComponent },
  { path: '401', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['/404']);
    };
  }
}
