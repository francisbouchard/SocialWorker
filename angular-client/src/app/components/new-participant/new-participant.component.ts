import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { FormGroup, FormControl, Validators,ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})

export class NewParticipantComponent implements OnInit {
  form: FormGroup;

  isAlreadyAParticipantID = false;
  isAlreadyAParticipantEmail = false;

  constructor(
    private fb: FormBuilder,
    private participantService: ParticipantService,
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public router: Router) {


    this.form = this.fb.group({
            name: ['', Validators.required ],
            _id: ['', Validators.required ],
           // password:new FormControl('',Validators.required),
            address: ['', Validators.required ],
            telephone: [''],
            email: [''],
            socialmedia: this.fb.group({ // <-- the child FormGroup
              username: [''],
              service: [''],
     }),
}, {
      validator: (formgroup: FormGroup) => {
        return this.validateInput(formgroup);
        }
      });
  }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }

  }
   validateInput(formgroup: FormGroup) {
     const socialun = formgroup.value.socialmedia.username;
     const socials = formgroup.value.socialmedia.service;
    if ((formgroup.controls['telephone'].value || formgroup.controls['email'].value || socialun && socials)) {
  console.log('OK');
  return null;
  }else {
    console.log('Not OK');
    return {validateInputData: true};
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
  onSubmit() {
    console.log(this.form.value);
        this.participantService.save(this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new participant.');
        } else {
          this.alertModal('New participant successfully added.')
        }
      });
}
}
