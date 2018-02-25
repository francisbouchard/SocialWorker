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

  getParticipant(pid) {
    this.participantService.get(pid)
      .subscribe(data => {
        this.profiles = [data];
      });
  }

  /**
   * Delete participant by id
   *
   * @param {any} id
   * @memberof ViewParticipantsComponent
   */
  delete(pid) {
    this.participantService.delete(pid)
      .subscribe(data => {
        console.log('Deleted: ' + data);
        this.loadParticipants();
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
   * Update participant with new attributes
   *
   * @param {any} id
   * @param {any} participant
   * @memberof ViewParticipantsComponent
   */
  update(id, participant) {
    this.participantService.update(id, participant) // TODO
      .subscribe(data => {
        console.log(data);
        this.cancel();
      });
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

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadParticipants();
    }
  }


}


