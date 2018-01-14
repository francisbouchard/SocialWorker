import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseService } from '../../services/case.service';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  ok(): void {
    this.dialogRef.close();
  }

}
