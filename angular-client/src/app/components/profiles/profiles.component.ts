import { Component, OnInit } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent {
  public profiles;
  constructor(private participantService: ParticipantService) {
  }

  loadProfiles(){
    this.participantService.getAll()
    .subscribe(data => {
      console.log(data);
      this.profiles = data;
    });
  }

  ngOnInit() {
    this.loadProfiles();
  }


}


