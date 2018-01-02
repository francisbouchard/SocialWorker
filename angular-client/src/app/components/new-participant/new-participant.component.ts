import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../participant/participant';

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

  constructor(private participantService: ParticipantService) {
  }

  ngOnInit() {
  }


/**
 * Submit new participant profile information.
 * 
 * @memberof NewParticipantComponent
 */
submit() {
    this.participantService.save(this.participantData)
      .subscribe(data => {
        // console.log(data);
      })
  }
}
