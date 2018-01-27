import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteComponent } from '../note/note.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';

import { RouterModule, Router } from '@angular/router';


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
    public dialog: MatDialog,
    public authService: AuthenticationService,
    public router: Router
  ) { }
  @Input() public participantSelected: Participant;

  ngOnInit() {
    this.getParticipant();
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
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
      width: '66%',
      data: { id: this.participantSelected._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

