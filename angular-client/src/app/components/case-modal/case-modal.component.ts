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
    contactedResources: []
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

  makeResourceArray(): void {
    const arrayOfResources = this.mycase.contactedResources;
    this.mycase.contactedResources = [];
    arrayOfResources.forEach(element => {
      this.mycase.contactedResources.push({_id: element, status: ''});
    });
  }

  submit(): void {
    this.makeResourceArray();
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
