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
  selectedUrgency: String;
  resources: Object;
  case: Case = {
    _id: '',
    status: 'In progress',
    urgency: 'Regular',
    comment: '',
    shelters: new Map<String, String>(),
    shelterchosen: '',
  };

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


  constructor(
    private caseService: CaseService,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  ngOnInit() {
    this.loadAllResources();
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
