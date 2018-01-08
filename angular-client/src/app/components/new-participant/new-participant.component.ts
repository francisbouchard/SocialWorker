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

  isAlreadyAParticipantID = false;
  isAlreadyAParticipantEmail = false;

  constructor(private participantService: ParticipantService) {
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
  onKey(event: any) {
    let query = event.target.name + '=' + event.target.value;
    let that = this;
    console.log(event.target.value);
    this.participantService.search(query)
      .subscribe(data => {
        if (event.target.name == "_id") {
          that.isAlreadyAParticipantID = (data == true) ? true : false;
        } else {
          that.isAlreadyAParticipantEmail = (data == true) ? true : false;
        }

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
        console.log(data);
      })
  }
}
