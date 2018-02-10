import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  hasTabChanged = true;

  constructor(private participantService: ParticipantService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  changeTab() {
    this.hasTabChanged = !this.hasTabChanged;
  }

}
