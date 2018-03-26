import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../../services/follow-up.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service'
import { element } from 'protractor';
import { AlertModalComponent } from '../modals/alert-modal/alert-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
form: FormGroup;
participants;
private selectedTab = 0;
followups: Object[] = [];
  

  constructor(private participantService: ParticipantService, 
    public authService: AuthenticationService, 
    public router: Router, 
    private formBuilder: FormBuilder, 
    private followupsService: FollowUpService,
    public dialog: MatDialog,
) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
    this.loadFollowUp();
    this.createForm();
    this.getParticipants();
  }
  /**
   * Gets list of participants
   *
   * @memberof FollowUpComponent
   */
  getParticipants(){
      this.participantService.getBySocialWorker().subscribe(data => {
        this.participants = data;
      })
  }
  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof FollowUpComponent
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
   * Views a single participant
   *
   * @param {any} pid
   * @memberof FollowUpComponent
   */
  view(pid) {
    this.router.navigateByUrl('participant-profile/' + pid);
  }

  changeTab() {
    this.selectedTab += 1;
    if (this.selectedTab >= 2) this.selectedTab = 0;
  }
  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      participant: ['', Validators.required],
      date: [''],
    });
  }

  loadFollowUp() {
    this.followupsService.getByUser().subscribe(data => {
      this.followups = data;
    })
  }
/**
   * Saves a single followup
   *
   * @memberof FollowUpComponent
   */
  saveFollowUp() {  
    this.participants.forEach(element => {
        if(this.form.value.participant == element.name){
            this.form.value.participant = element._id
        }
    });
    let that = this;
    this.followupsService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        that.changeTab();  
        this.loadFollowUp();
        if (data.hasOwnProperty('errmsg')) {
            this.alertModal('Could not add new followup.');
          } else {
            this.alertModal('New followup successfully added.');
          }
      });
  }
/**
   * Deletes a single followup
   *
   * @param {any} followupID
   * @memberof FollowUpComponent
   */
  deleteFollowup(followupID: String) {
    this.followupsService.delete(followupID)
      .subscribe(data => {
          this.loadFollowUp();
        console.log(data);
      });
  }
 

}
