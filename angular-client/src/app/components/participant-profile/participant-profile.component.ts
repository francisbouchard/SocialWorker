import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private participantService: ParticipantService) { }

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    console.log(id);
  }
}

