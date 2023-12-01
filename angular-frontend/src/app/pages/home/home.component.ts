import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleChevronLeft, faCircleChevronRight } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/User.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  autoplayInterval: any;
  leftArrow = faCircleChevronLeft;
  rightArrow = faCircleChevronRight;
  currentUser: User = new User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }
  
  ngOnInit(): void {
    this.startAutoplay();
  }

  getStarted(){
    if (this.currentUser?.userId) {
      console.log(this.currentUser.role);
      if (this.currentUser.role === 'ADMIN') {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['projects']);
      }
    } else {
      this.router.navigate(['register']);
    }
  }
  
  startAutoplay() {
    // Set interval to simulate "Next" button click every 3 seconds (adjust timing as needed)
    this.autoplayInterval = setInterval(() => {
      const nextButton = document.querySelector('.btn-slide.next') as HTMLElement;
      nextButton.click();
    }, 10000); // Change this value to adjust the autoplay interval in milliseconds
  }

  ngOnDestroy() {
    // Clear the interval to stop autoplay when the component is destroyed
    clearInterval(this.autoplayInterval);
  }

  
  /*

  getUser() {
    console.log(this.token);
    this.authService.getuser("Bearer " + this.token, this.id).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  getAllUsers() {
    this.authService.getAllusers("Bearer " + this.token).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }

  createProject() {
  
    this.project.title="project 3";
    console.log(this.project.title);
    console.log(this.token);
    this.authService.createProject(this.project, "Bearer " + this.token).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    })
  }*/

}
