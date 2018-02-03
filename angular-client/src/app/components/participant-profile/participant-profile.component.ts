import { Component, OnInit, Input, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { NoteComponent } from '../note/note.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AppModule } from '../../app.module';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DocumentComponent } from '../document/document.component';
import { CaseModalComponent } from '../case-modal/case-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {
  orderedNotes = [];
  @Input() public participantSelected: Participant;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private location: Location,
    private dialog: MatDialog,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadParticipant();
    if (!this.authService.loggedIn) {
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

  newCase(): void {
    const dialogRef = this.dialog.open(CaseModalComponent, {
      width: '66%',
      data: { participant: this.participantSelected }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
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
      console.log('note deleted');
      this.loadParticipant();
    });
  }

  /**
   * Add a note to a participant
   * 
   * @memberof ParticipantProfileComponent
   */
  addNote(): void {
    const dialogRef = this.dialog.open(NoteComponent, {
      width: '66%',
      data: { id: this.participantSelected._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadParticipant();
    });
  }

  addDocument(): void {
    const dialogRef = this.dialog.open(DocumentComponent, {
      width: '66%',
      data: { id: this.participantSelected._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadParticipant();
    });
  }

}
