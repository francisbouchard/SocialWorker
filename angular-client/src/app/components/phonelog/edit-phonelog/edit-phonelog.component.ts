import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';

@Component({
  selector: 'app-edit-phonelog',
  templateUrl: './edit-phonelog.component.html',
  styleUrls: ['./edit-phonelog.component.css']
})
export class EditPhonelogComponent implements OnInit {
  @Input() log: Phonelog;
  @Output() cancel = new EventEmitter();
      editphonelog: FormGroup;
      editingLog = Phonelog;
      date;
  callertype = [
    'trans person',
    'organization',
    'social worker',
    'other person',
  ];
   phoneregex = /^(\+)?(\d){0,2}(-|.|\s|\()?(\d){3}(-|.|\s|\()?(\d){3}(-|.|\s|\()?(\d){4}$/m;
  constructor(private form: FormBuilder, 
              private phonelogService: PhonelogService)
               {this.date = new Date();}

  ngOnInit() {
    this.createForm();
  }

createForm() {
    this.editphonelog = this.form.group({
      name: [this.log.name, Validators.required],
      pronouns: this.log.pronouns||'',
      language: this.log.language||'',
      urgent: this.log.urgent,
      phonenumber: [this.log.phonenumber||'', Validators.pattern(this.phoneregex)],
      subject: this.log.subject||'',
      message:this.log.message||'',
      notes: this.log.notes||'',
      callertype: this.log.callertype
      //date:
    });
  }

/**
   * Update Log with new attributes
   *
   * @param {any} id
   * @param {any} log
   * @memberof EditPhonelogComponent
   */

  update(id,log) {
    const formModel = this.editphonelog.value;
    this.phonelogService.update(id,formModel) // TODO
      .subscribe(data => {
        this.cancel.emit();
      });
  }
}
