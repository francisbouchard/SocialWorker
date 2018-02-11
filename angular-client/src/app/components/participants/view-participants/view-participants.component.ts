import { Component, OnInit, Input } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css']
})
export class ViewParticipantsComponent implements OnInit {
  @Input() hasTabChanged: boolean;

  public profiles;
  constructor(private participantService: ParticipantService, public authService: AuthenticationService, public router: Router) {
  }

  loadParticipants() {
    if (this.authService.role == "admin") {
      this.participantService.getAll()
        .subscribe(data => {
          this.profiles = data;
        });
    } else {
      this.participantService.getBySocialWorker()
        .subscribe(data => {
          this.profiles = data;
        });
    }
  }

  getParticipant(pid) {
    this.participantService.get(pid)
      .subscribe(data => {
        this.profiles = [data];
      });
  }

  delete(pid) {
    this.participantService.delete(pid)
      .subscribe(data => {
        console.log('Deleted: ' + data);
        this.loadParticipants();
      });
  }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadParticipants();
    }
  }


}


