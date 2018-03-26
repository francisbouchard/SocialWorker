import { Component, OnInit } from '@angular/core';
import { FollowUpService } from '../../services/follow-up.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ParticipantService } from '../../services/participant.service'
import { element } from 'protractor';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.css']
})
export class FollowUpComponent implements OnInit {
form: FormGroup;
participants;
followups: Object[];
  
  hasTabChanged = true;

  constructor(private participantService: ParticipantService, public authService: AuthenticationService, public router: Router, private formBuilder: FormBuilder, private followupsService: FollowUpService) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
    this.loadFollowUp();
    this.createForm();
    this.getParticipants();
  }
  getParticipants(){
      this.participantService.getBySocialWorker().subscribe(data => {
        this.participants = data;
      })
  }

  changeTab() {
    this.hasTabChanged = !this.hasTabChanged;
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

  saveFollowUp() {
    this.followupsService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        this.loadFollowUp();
      });
  }

  deleteTask(followupID: String) {
    this.followupsService.delete(followupID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
