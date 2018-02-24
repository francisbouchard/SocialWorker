import { Component, OnInit, Inject } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-assign-worker-modal',
  templateUrl: './assign-worker-modal.component.html',
  styleUrls: ['./assign-worker-modal.component.css']
})
export class AssignWorkerModalComponent implements OnInit {
  allWorkers: [any];
  participantWorkersIds: [String];
  selectedWorkerId: String;

  constructor(private participantService: ParticipantService,
    private userService: UserService,
    public dialogRef: MatDialogRef<AssignWorkerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public participant: any) { }

  ngOnInit() {
    this.loadAllWorkers();
    this.participantWorkersIds = this.participant.workers.map(w => w._id);
  }

  loadAllWorkers() {
    this.userService.getAll()
      .subscribe( (data: [any]) => {
        this.allWorkers = data;
      });
  }

  addWorker() {
    this.participantService.addSocialWorker(this.participant.id, this.selectedWorkerId)
      .subscribe( data => {
        console.log(data);
      });
  }

  isDisabled(id: String): boolean {
    return this.participantWorkersIds.includes(id);
  }

  close(): void {
    this.dialogRef.close();
  }
}
