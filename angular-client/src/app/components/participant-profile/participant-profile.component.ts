import { Component, OnInit, Input, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Participant } from '../../classes/participant';
import { Casefile } from '../../classes/case';
import { NoteComponent } from '../note/note.component';
import { CaseModalComponent } from '../case-modal/case-modal.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ParticipantService } from '../../services/participant.service';
import { CasefileService } from '../../services/casefile.service';



@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {

  orderedCases = [];
  orderedNotes = [];
  @Input() public participantSelected: Participant;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantService: ParticipantService,
    private location: Location,
    private dialog: MatDialog,
    private casefileService: CasefileService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.loadParticipant();
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Load a participant's profile
   *
   * @memberof ParticipantProfileComponent
   */
  loadParticipant(): void {
    const id = this.route.snapshot.paramMap.get('_id');
    this.participantService.get(id).subscribe(participantSelected => {
      if (participantSelected != null) {
        this.participantSelected = participantSelected as Participant;
        this.loadCases();
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
      this.loadParticipant();
    });
  }

  loadCases(): void {
    this.casefileService.getByParticipant(this.participantSelected._id)
    .subscribe(data => {
      if (data[0]) {
        this.orderedCases = data as Array<Casefile>;
      } else {
        this.orderedCases = [];
      }
      console.log(data);
    });
  }

  /**
   * Deletes selected note
   *
   * @param {any} noteID
   * @memberof ParticipantProfileComponent
   */
  deleteNote(noteID): void {
    this.participantService.deleteNote(this.participantSelected._id, noteID)
      .subscribe(result => {
        this.loadParticipant();
      });
  }

  /**
   * Deletes selected casefile
   *
   * @param {any} casefileID
   * @memberof ParticipantProfileComponent
   */
  deleteCasefile(casefileID): void {
    this.casefileService.delete(casefileID)
      .subscribe(result => {
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
      console.log('The dialog was closed');
      this.loadParticipant();
    });
  }

  completeCase(): void {
    // TODO set case status to done
  }

  updateCase(): void {
    // TODO update case
  }

}
