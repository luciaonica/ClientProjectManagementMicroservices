import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectSaveComponent } from './components/project-save/project-save.component';
import { ProjectUpdateComponent } from './components/project-update/project-update.component';
import { AdminComponent } from './pages/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { NextDirective } from './directives/next.directive';
import { PrevDirective } from './directives/prev.directive';
import { TabsComponent } from './components/tabs/tabs.component';
import { DeveloperComponent } from './pages/developer/developer.component';
import { DeveloperSaveComponent } from './components/developer-save/developer-save.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ProjectsComponent,
    ProjectSaveComponent,
    ProjectUpdateComponent,
    AdminComponent,
    FooterComponent,
    UserDetailsComponent,
    NextDirective,
    PrevDirective,
    TabsComponent,
    DeveloperComponent,
    DeveloperSaveComponent   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    CarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
