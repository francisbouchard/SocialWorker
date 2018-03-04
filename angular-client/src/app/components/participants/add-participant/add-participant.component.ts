import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../classes/participant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from "@angular/forms";



@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.css']
})
export class AddParticipantComponent implements OnInit {

  form: FormGroup;
  socialmedia: FormGroup;

  participantData: Participant = {
    _id: '',
    name: '',
    pronouns: '',
    address: '',
    telephone: '',
    email: '',
    socialmedia: { service: '', username: '' },
    notes: [{}]
  };

  isAlreadyAParticipantID = false;
  isAlreadyAParticipantEmail = false;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public router: Router) {
    this.createForm();
  }



  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      _id: ['', Validators.required],
      pronouns: [''],
      telephone: [''],
      socialMedia: [''],
      socialMediaAccount: [''],
      email: ['', Validators.email],
      address: ['']
    });
  }


  /**
   * Verify if attribute and value of the given input has
   * already been associated to a participant.
   *
   * @param {*} event
   * @memberof AddParticipantComponent
   */
  onKey(attribute: String, value: String) {
    const query = attribute + '=' + value;
    const that = this;
    if (value != null) {
      this.participantService.search(query)
        .subscribe(data => {
          if (attribute === '_id') {
            that.isAlreadyAParticipantID = (data === true) ? true : false;
          } else {
            that.isAlreadyAParticipantEmail = (data === true) ? true : false;
          }
        });
    }
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddParticipantComponent
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
   * @memberof AddParticipantComponent
   */
  onSubmit() {
    this.participantService.save(this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new participant.');
        } else {
          this.alertModal('New participant successfully added.');
        }
      });
  }
}
