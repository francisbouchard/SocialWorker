import { Component, OnInit, Inject, Input } from '@angular/core';
import { ParticipantService } from '../../../services/participant.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-worker-modal',
  templateUrl: './edit-worker-modal.component.html',
  styleUrls: ['./edit-worker-modal.component.css']
})
export class EditWorkerModalComponent implements OnInit {
  allWorkers: [any];
  participantWorkersIds: [String];
  selectedWorkerId: String;

  constructor(private participantService: ParticipantService,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditWorkerModalComponent>,
    @Input() @Inject(MAT_DIALOG_DATA) public participant: any) { }

  ngOnInit() {
    this.loadAllWorkers();
    // workers who are already assigned to this participant
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
      .subscribe( (data: any) => {
        this.participant.workers = data.socialworkers;
        this.participantWorkersIds = this.participant.workers.map(w => w._id);
        this.selectedWorkerId = null;
      });
  }

  removeWorker(workerId: String) {
    this.participantService.removeSocialWorker(this.participant.id, workerId)
      .subscribe( (data: any) => {
        this.participant.workers = data.socialworkers;
        this.participantWorkersIds = this.participant.workers.map(w => w._id);
      });
  }

  isDisabled(id: String): boolean {
    return this.participantWorkersIds.includes(id);
  }

  close(): void {
    this.dialogRef.close();
  }
}
