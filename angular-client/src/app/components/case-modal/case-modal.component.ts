import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseService } from '../../services/case.service';
import { Case } from '../../classes/case';


@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {

  statuses = ['In progress', 'Completed'];
  selectedStatus: String;
  case: Case = {
    participant: '',
    status: 'In progress'
  };


  constructor(
    private caseService: CaseService,
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.case.participant = data.pid;
  }


  ngOnInit() {
  }

  submit(): void {
    this.caseService.save(this.case)
    .subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
