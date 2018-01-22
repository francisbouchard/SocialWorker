import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
    private location: Location,
    public dialog: MatDialog
  ) { }
  @Input() public participantSelected: Participant;

  ngOnInit() {
    this.getParticipant();
  }

  /**
   *
   * Updates the participant based on the _id
   *
   */
  getParticipant(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.participantService.get(id).subscribe(participantSelected => {
      if (participantSelected != null) {
        this.participantSelected = participantSelected as Participant;
      } else {
        console.log('Participant does not exist anymore.');
        this.location.back();
      }
    });
  }

  /**
   * Add a note to a participant
   * 
   * @memberof ParticipantProfileComponent
   */
  addNote(): void {
    let dialogRef = this.dialog.open(NoteComponent, {
      width: '250px',
      data: { message: "New Note" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

