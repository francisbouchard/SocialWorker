import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { NoteComponent } from '../note/note.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AppModule } from '../../app.module';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {
  orderedNotes = [];

  constructor(
    private route: ActivatedRoute,
    private participantService: ParticipantService,
    public authService: AuthenticationService,
    public router: Router,
    private location: Location,
    public dialog: MatDialog
  ) { }
  @Input() public participantSelected: Participant;

  ngOnInit() {
    this.loadParticipant();
    if(!this.authService.loggedIn){
      this.router.navigateByUrl('login');
    }
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

