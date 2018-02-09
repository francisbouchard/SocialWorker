import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CasefileService } from '../../services/casefile.service';
import { ResourceService } from '../../services/resource.service';
import { Casefile } from '../../classes/case';
import { Participant } from '../../classes/participant';


@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {
  statuses = ['In progress', 'Completed'];
  urgencies = ['Regular', 'Urgent'];
  resources: Object;
  mycase: Casefile = {
    participant: '',
    status: 'In progress',
    notes: '',
    urgency: 'Regular',
    contactedResources: []
  };

  constructor(
    private caseService: CasefileService,
    private resourceService: ResourceService,
    public dialogRef: MatDialogRef<CaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.mycase.participant = this.data.participant._id;
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
        this.resources = data;
      });
  }

  /**
   * Changes the array on contacteResources
   * from an array of Strings to an array 
   * of key-value pairs resource:String status:String
   */
  makeResourceArray(): void {
    const arrayOfResources = this.mycase.contactedResources;
    this.mycase.contactedResources = [];
    arrayOfResources.forEach(element => {
      this.mycase.contactedResources.push({resource: element, status: 'To Contact', dateContacted: null, note: ''});
    });
  }

  submit(): void {
    this.makeResourceArray();
    this.caseService.save(this.mycase)
    .subscribe(data => {
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
