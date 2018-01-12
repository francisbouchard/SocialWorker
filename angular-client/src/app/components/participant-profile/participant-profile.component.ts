import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../participant/participant';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})
export class ParticipantProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute, private participantService: ParticipantService) { }
  @Input() public participantSelected: any;

  ngOnInit() {
    this.getParticipant();
  }

  getParticipant(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.participantService.get(id).subscribe(participantSelected => this.participantSelected = participantSelected);
  }
}

