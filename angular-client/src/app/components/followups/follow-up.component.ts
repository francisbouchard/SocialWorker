import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../../services/follow-up.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {

  hasTabChanged = true;

  constructor(private participantService: FollowUpService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  changeTab() {
    this.hasTabChanged = !this.hasTabChanged;
  }

}
