import { Component, OnInit, Input, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { Casefile } from '../../../classes/case';
import { CasefileService } from '../../../services/casefile.service';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ParticipantService } from '../../../services/participant.service';
import { Participant } from '../../../classes/participant';
import { DocumentComponent } from '../../document/document.component';
import { NoteComponent } from '../../note/note.component';
import { AuthenticationService } from '../../../services/authentication.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

import { CaseModalComponent } from '../../modals/case-modal/case-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssignWorkerModalComponent } from '../../modals/assign-worker-modal/assign-worker-modal.component';


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {

  orderedCases = [];
  orderedDocuments = [];
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
        // order documents and notes of participant in reverse chronological order
        this.orderedDocuments = this.participantSelected.documents.sort((doc1, doc2) => {
          return new Date(doc2.date).getTime() - new Date(doc1.date).getTime();
        });
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
   * Open casefile modal to create a new casefile
   *
   * @memberof ParticipantProfileComponent
   */
  newCase(): void {
    const dialogRef = this.dialog.open(CaseModalComponent, {
      width: '66%',
      data: { participant: this.participantSelected }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadParticipant();
    });
  }

  /**
   * Load cases for a participant
   *
   * @memberof ParticipantProfileComponent
   */
  loadCases(): void {
    this.casefileService.getByParticipant(this.participantSelected._id)
      .subscribe(data => {
        if (data[0]) {
          const cases = data as Array<Casefile>;
          this.orderedCases = cases.sort((case1, case2) => {
            return new Date(case2.date).getTime() - new Date(case1.date).getTime();
          });
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

  /**
   * Delete a document of a participant
   *
   * @param {any} documentID
   * @memberof ParticipantProfileComponent
   */
  deleteDocument(documentID): void {
    this.participantService.deleteDocument(this.participantSelected._id, documentID)
      .subscribe(result => {
        this.loadParticipant();
      });
  }

  /**
   * Add a document to a participant profile
   *
   * @memberof ParticipantProfileComponent
   */
  addDocument(): void {
    const dialogRef = this.dialog.open(DocumentComponent, {
      width: '66%',
      data: { id: this.participantSelected._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadParticipant();
    });
  }

  /**
   * Complete a casefile
   *
   * @param {any} casefile
   * @param {any} casefileIndex
   * @memberof ParticipantProfileComponent
   */
  completeCasefile(casefile, casefileIndex): void {
    this.orderedCases[casefileIndex].status = 'Completed';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'Completed' }).subscribe();
  }

  /**
   * Reopen a casefile
   *
   * @param {any} casefile 
   * @param {any} casefileIndex 
   * @memberof ParticipantProfileComponent
   */
  reopenCasefile(casefile, casefileIndex): void {
    this.orderedCases[casefileIndex].status = 'In progress';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'In progress' }).subscribe();
  }

  /**
   * Update casefile's resource date of contact
   *
   * @param {any} isResourceContacted
   * @param {any} casefile
   * @param {any} resource
   * @param {any} casefileIndex
   * @param {any} resourceIndex
   * @param {Date} dateInput
   * @memberof ParticipantProfileComponent
   */
  updateCaseDate(isResourceContacted, casefile, resource, casefileIndex, resourceIndex, dateInput: Date): void {

    const casefileID = casefile._id;
    const resourceID = resource.resource._id;
    const dateContacted = resource.dateContacted;
    const status = (isResourceContacted) ? 'Contacted' : 'To Contact';
    let date;
    if (isResourceContacted) {
      date = (dateContacted) ? dateContacted : (dateInput || new Date());
    } else {
      date = null;
    }
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].dateContacted = date;
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].status = status;

    this.casefileService.updateCaseContactedResource(casefileID, resourceID, { 'status': status, 'dateContacted': date }).subscribe();
  }

  /**
   * Update a casefile's resource comment
   *
   * @param {any} casefile
   * @param {any} resource
   * @param {any} comment
   * @memberof ParticipantProfileComponent
   */
  updateCaseResourceNote(casefile, resource, comment) {
    this.casefileService.updateCaseContactedResource(casefile._id, resource.resource._id, { 'note': comment }).subscribe();
  }

  /**
   * Update casefile with selected resource
   *
   * @param {any} casefile
   * @param {any} selection
   * @memberof ParticipantProfileComponent
   */
  updateCaseSelectedResource(casefile, selection) {
    const selectedResource = { 'selectedResource': selection };
    this.casefileService.updateCaseSelectedResource(casefile._id, selectedResource).subscribe();
  }

  /**
   * Open the Assign Worker modal
   * 
   * @memberof ParticipantProfileComponent
   */
  assignWorker(): void {
    const dialogRef = this.dialog.open(AssignWorkerModalComponent, {
      width: '66%',
      data: { id: this.participantSelected._id, workers: this.participantSelected.socialworkers }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadParticipant();
    });
  }

}
