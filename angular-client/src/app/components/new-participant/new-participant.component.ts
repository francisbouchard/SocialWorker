import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../participant/participant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../alert-modal/alert-modal.component';

@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})
export class NewParticipantComponent implements OnInit {

  participantData: Participant = {
    _id: "",
    name: "",
    address: "",
    telephone: "",
    email: "",
    socialmedia: ""
  }

  isAlreadyAParticipantID = false;
  isAlreadyAParticipantEmail = false;

  constructor(private participantService: ParticipantService, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  /**
   * Verify if attribute and value of the given input has 
   * already been associated to a participant.
   * 
   * @param {*} event 
   * @memberof NewParticipantComponent
   */
  onKey(attribute: String, value: String) {
    let query = attribute + '=' + value;
    let that = this;
    this.participantService.search(query)
      .subscribe(data => {
        if (attribute == "_id") {
          that.isAlreadyAParticipantID = (data == true) ? true : false;
        } else {
          that.isAlreadyAParticipantEmail = (data == true) ? true : false;
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
    let dialogRef = this.dialog.open(AlertModalComponent, {
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
        if (data.hasOwnProperty("errmsg")) {
          this.alertModal("Could not add new participant.");
        } else {
          this.alertModal("New participant successfully added.")
        }
      })
  }
}
