import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  public profiles;
  constructor(private participantService: ParticipantService, public authService: AuthenticationService, public router: Router) {
  }

  loadProfiles() {
    this.participantService.getAll()
    .subscribe(data => {
      this.profiles = data;
    });
  }

  getProfile(pid) {
    this.participantService.get(pid)
    .subscribe(data => {
      this.profiles = [data];
    });
  }

  delete(pid) {
    this.participantService.delete(pid)
    .subscribe(data => {
      console.log('Deleted: ' + data);
      this.loadProfiles();
    });
  }

  ngOnInit() {
    this.loadProfiles();
    if(!this.authService.loggedIn){
      this.router.navigateByUrl('login');
    }
  }


}


