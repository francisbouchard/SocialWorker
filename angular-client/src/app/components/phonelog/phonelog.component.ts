import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-phonelog',
  templateUrl: './phonelog.component.html',
  styleUrls: ['./phonelog.component.css']
})
export class PhonelogComponent implements OnInit {

  isViewActive = true;
  currentTab = 0;

  constructor(
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
    this.router.navigateByUrl('login');
    }
  }

  changeTab() {
    this.isViewActive = !this.isViewActive;
  }

  viewLogsTab() {
    this.currentTab = 0;
  }

}
