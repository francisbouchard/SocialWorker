import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CasefileService } from '../../../services/casefile.service';
import { ResourceService } from '../../../services/resource.service';
import { Casefile } from '../../../classes/case';
import { Participant } from '../../../classes/participant';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent implements OnInit {
  statuses = ['In progress', 'Completed'];
  urgencies = ['Regular', 'Urgent'];
  resources: any[];
  resourceTypes = [];
  mycase: Casefile = {
    createdBy: '',
    participant: '',
    status: 'In progress',
    notes: null,
    urgency: 'Regular',
    contactedResources: [],
    date: new Date(),
    type: ''
  };

  constructor(
    private caseService: CasefileService,
    private resourceService: ResourceService,
    private authService: AuthenticationService,
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
        this.setResourceTypes();
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
      this.mycase.contactedResources.push({ resource: element, isContacted: false, dateContacted: null, note: null });
    });
  }

  /**
   * From all the resources, create a set of resource types.
   * Ex: Housing, Legal, Job Security.
   *
   * @memberof CaseModalComponent
   */
  setResourceTypes() {
    for (let i = 0; i < this.resources.length; i++) {
      if (this.resourceTypes.indexOf(this.resources[i].kind) === -1) {
        this.resourceTypes.push(this.resources[i].kind);
      }
    }
    this.resourceTypes.sort();
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
