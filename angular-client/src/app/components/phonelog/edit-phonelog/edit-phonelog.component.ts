import { Component, OnInit, Input } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-edit-phonelog',
  templateUrl: './edit-phonelog.component.html',
  styleUrls: ['./edit-phonelog.component.css']
})
export class EditPhonelogComponent implements OnInit {
  @Input() log: Object;

   date;
  callertype = [
    'trans person',
    'organization',
    'social worker',
    'other person',
  ];
  constructor() {    this.date = new Date();
 }

  ngOnInit() {
  }

}
