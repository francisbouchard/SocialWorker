import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../../../classes/participant';

@Component({
  selector: 'app-edit-participant',
  templateUrl: './edit-participant.component.html',
  styleUrls: ['./edit-participant.component.css']
})
export class EditParticipantComponent implements OnInit {
  @Input() participant: Object;

  constructor() { }

  ngOnInit() {
  }

}
