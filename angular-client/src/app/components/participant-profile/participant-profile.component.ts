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
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {

  deleteme = true;
  orderedCases = [];
  orderedNotes = [];
  today = Date.now();
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
      this.loadParticipant();
    });
  }

  loadCases(): void {
    this.casefileService.getByParticipant(this.participantSelected._id)
    .subscribe(data => {
      if (data[0]) {
        this.orderedCases = data as Array<Casefile>;
        // TODO order cases by chrono order!
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
      this.loadParticipant();
    });
  }

  completeCase(): void {
    // TODO set case status to done
  }

  updateCaseToggle(isResourceContacted, casefileID, resourceID, dateContacted, casefileIndex, resourceIndex): void {
    const status = (isResourceContacted) ? 'Contacted' : 'To Contact';
    console.log('toggle');
    console.log(this.orderedCases);
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].status = status;
    let date;
    if (isResourceContacted) {
      date = (dateContacted) ? dateContacted : new Date();
    } else {
      date = null;
    }
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].dateContacted = date;
    this.casefileService.updateCaseContactedResource(casefileID, resourceID, {'status': status, 'dateContacted' : date})
    .subscribe(result => {
      console.log(result);
      console.log(this.orderedCases);
    });
  }

  updateCaseDate(casefile, caseResource, resourceIndex, casefileIndex) {

    this.updateCaseToggle(true, casefile._id, caseResource.resource._id, caseResource.dateContacted, resourceIndex, casefileIndex);
  }

}
