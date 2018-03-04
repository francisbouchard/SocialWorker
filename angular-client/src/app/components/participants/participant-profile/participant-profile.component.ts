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


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {

  isSelectedResourceValid = false;
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
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    } else {
      this.loadParticipant();
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
   * Open note modal to create a note for a participant
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
   * Open a document modal to create a document for a participant
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

}
