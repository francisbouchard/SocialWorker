import { Component, OnInit, Input } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Participant } from '../../../classes/participant';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css'],
})

export class ViewParticipantsComponent implements OnInit {
  @Input() hasTabChanged: boolean;
  editingParticipant: Participant;

  public profiles;
  public sortProperty = 'name';
  public reverse = false;
  public query: string;

  constructor(
    private participantService: ParticipantService,
    public authService: AuthenticationService,
    public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadParticipants();
    }
  }

  /**
   * Load all participants, depending on access level
   *
   * @memberof ViewParticipantsComponent
   *
   */
  loadParticipants() {
    if (this.authService.role === 'admin') {
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

  /**
   * Load one participant by ID
   *
   * @param {any} pid
   * @memberof ViewParticipantsComponent
   */
  getParticipant(pid) {
    this.participantService.get(pid)
      .subscribe(data => {
        this.profiles = [data];
      });
  }

  /**
   * Views a single participant
   *
   * @param {any} pid
   * @memberof ViewParticipantsComponent
   */
  view(pid) {
    this.router.navigateByUrl('participant-profile/' + pid);
  }

  /**
   * Specify which participant is currently in edit mode
   *
   * @param {any} id
   * @param {any} participant
   * @memberof ViewParticipantsComponent
   */
  edit(id, participant) {
    this.editingParticipant = participant;
  }

  /**
   * Cancel edit mode and return to view mode
   *
   * @memberof ViewParticipantsComponent
   */
  cancel() {
    this.edit('', null);
    this.loadParticipants();
  }

}


