import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

/**
 *  This mini-component takes care of a single selected profile of a participant
 */
export class ParticipantProfileComponent implements OnInit {
  orderedNotes = [];

  constructor(private route: ActivatedRoute, private participantService: ParticipantService, private location: Location
  ) { }
  @Input() public participantSelected: Participant;

  ngOnInit() {
    this.loadParticipant();
  }

  /**
   *
   * Updates the participant based on the _id
   *
   */
  loadParticipant(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.participantService.get(id).subscribe(participantSelected => {
        if (participantSelected != null) {
          this.participantSelected = participantSelected as Participant;
          // order notes of participant in reverse chronological order
          this.orderedNotes = this.participantSelected.notes.sort((note1, note2) => {
            return new Date(note2.date).getTime() - new Date(note1.date).getTime();
          });
        } else {
          console.log('Participant does not exist anymore.');
          this.location.back();
        }
      });
  }

  /**
   * 
   * Deletes the selected note
   * 
   */
  deleteNote(noteID): void {
    this.participantService.deleteNote(this.participantSelected._id, noteID)
    .subscribe(result => {
      console.log("note deleted");
      this.loadParticipant();
    })
  }
}

