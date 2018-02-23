import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isTrashDisplayed = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authenticationService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  displayTrash() {
    this.isTrashDisplayed = !this.isTrashDisplayed;
  }

}
