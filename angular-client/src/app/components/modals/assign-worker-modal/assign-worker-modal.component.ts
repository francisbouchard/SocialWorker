import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-assign-worker-modal',
  templateUrl: './assign-worker-modal.component.html',
  styleUrls: ['./assign-worker-modal.component.css']
})
export class AssignWorkerModalComponent implements OnInit {

  constructor(private participantService: ParticipantService,
    public dialogRef: MatDialogRef<AssignWorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
