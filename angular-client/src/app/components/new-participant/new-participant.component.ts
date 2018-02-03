import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})
export class NewParticipantComponent implements OnInit {

  participantData: Participant = {
    _id: '',
    name: '',
    pronouns: '',
    address: '',
    telephone: '',
    email: '',
    socialmedia: {service: '', username: '' },
    notes: [{}]
  };

  isAlreadyAParticipantID = false;
  isAlreadyAParticipantEmail = false;

  constructor(
    private participantService: ParticipantService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public router: Router) {
  }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Verify if attribute and value of the given input has 
   * already been associated to a participant.
   * 
   * @param {*} event 
   * @memberof NewParticipantComponent
   */
  onKey(attribute: String, value: String) {
    const query = attribute + '=' + value;
    const that = this;
    this.participantService.search(query)
      .subscribe(data => {
        if (attribute === '_id') {
          that.isAlreadyAParticipantID = (data === true) ? true : false;
        } else {
          that.isAlreadyAParticipantEmail = (data === true) ? true : false;
        }
      });
  }

  /**
   * Alert user of response success or fail.
   * 
   * @param {any} message 
   * @memberof NewParticipantComponent
   */
  alertModal(message): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  /**
   * Submit new participant profile information.
   *
   * @memberof NewParticipantComponent
   */
  submit() {
    this.participantService.save(this.participantData)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new participant.');
        } else {
          this.alertModal('New participant successfully added.');
        }
      });
  }
}
