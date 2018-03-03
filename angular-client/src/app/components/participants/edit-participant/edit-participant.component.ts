import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Participant } from '../../../classes/participant';
import { ParticipantService } from '../../../services/participant.service';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {

  @Input() participant: Participant;
  @Output() cancel = new EventEmitter();
  participantForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private participantService: ParticipantService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * Create edit participant form
   *
   * @memberof EditParticipantComponent
   */
  createForm() {
    this.participantForm = this.form.group({
      name: this.participant.name || '',
      pronouns: this.participant.pronouns || '',
      email: this.participant.email || '',
      telephone: this.participant.telephone || '',
      address: this.participant.address || '',
      socialMediaPlatform: this.participant.socialmedia.service || '',
      socialMediaUsername: this.participant.socialmedia.username || ''
    });
  }

  /**
   * Delete this participant
   *
   * @param {any} pid
   * @memberof EditParticipantComponent
   */
  delete(pid) {
    this.participantService.delete(pid)
      .subscribe(data => {
        this.cancel.emit();
      });
  }

  /**
   * Update participant
   *
   * @param {any} id
   * @param {any} participant
   * @memberof EditParticipantComponent
   */
  update(id, participant) {
    const formModel = this.participantForm.value;
    this.participantService.update(id, formModel)
      .subscribe(data => {
        this.cancel.emit();
      });
  }

}
