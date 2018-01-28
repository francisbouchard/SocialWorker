import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { ParticipantService } from '../../services/participant.service';
import { Participant } from '../../classes/participant';
import { AppModule } from '../../app.module';
import { RouterModule, Router } from '@angular/router';

import { CaseModalComponent } from '../case-modal/case-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-participant-profile',
  templateUrl: './participant-profile.component.html',
  styleUrls: ['./participant-profile.component.css']
})

export class ParticipantProfileComponent implements OnInit {
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

  newCase(name): void {
    const dialogRef = this.dialog.open(CaseModalComponent, {
      width: '66%',
      data: { pid: name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

