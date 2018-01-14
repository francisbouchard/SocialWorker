import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { RequestService } from '../../services/request.service';
import { Request } from '../../classes/request';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {

  statuses = [ 'In progress', 'Completed'];
  selectedStatus: String;
  request: Request = {
    participant: '',
    status: 'In progress'
  };


  // constructor(
  //   private requestService: RequestService,
  //   public dialogRef: MatDialogRef<CaseModalComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) { }

  constructor(
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.request.participant = data.pid;
    }

  ngOnInit() {
  }

  submit(): void {
    console.log(this.request);
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
