import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CaseService } from '../../services/case.service';
import { ResourceService } from '../../services/resource.service';
import { Case } from '../../classes/case';


@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {
  statuses = ['In progress', 'Completed'];
  urgencies = ['Regular', 'Urgent'];
  resources: Object;
  mycase: Case = {
    participant: '',
    status: 'In progress',
    notes: '',
    contactedResources: new Map<String, String>(),
  };

  constructor(
    private caseService: CaseService,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.mycase.participant = this.data.pid;
    this.loadAllResources();
  }

  /**
   * Load all resources
   * 
   * @memberof ViewResourcesComponent
   */
  loadAllResources() {
    this.resourceService.getAll()
      .subscribe(data => {
        console.log(data);
        this.resources = data;
      });
  }


  submit(): void {
    this.caseService.save(this.mycase)
    .subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
