import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {
  
  resourceTypes = [ 'Housing', 'Medical' ];
  form: FormGroup;
  phoneregex = /^(\d){3}(-|\.|\s|\()?(\d){3}(-|\.|\s|\()?(\d){4}$/m;


  constructor(private fb: FormBuilder, private resourceService: ResourceService, public dialog: MatDialog, private router: Router
  ) {
    this.createForm();
  }


  ngOnInit() {
  }

  createForm() {
    this.form = this.fb.group({
      kind: this.resourceTypes[0],
      name: ['', Validators.required],
      email: [''],
      telephone: ['', Validators.pattern(this.phoneregex)],
      location: [''],
      notes: [''],
      term: [''],
      gender: [''],
      constraints: [''],
      without_cost: [''],
      waitlist_time: [''],
      schedule_availability: ['']
    });
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddResourceComponent
   */
  alertModal(message): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.form.reset({});
    });
  }

  /**
   * Submit new resource
   * @memberof AddResourceComponent
   */
  submit() {
    this.resourceService.save(this.form.value['kind'].toLowerCase(), this.form.value)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new resource.');
        } else {
          this.alertModal('New resource successfully added.');
          this.router.navigateByUrl('/resources');
        }
      });
  }

}
