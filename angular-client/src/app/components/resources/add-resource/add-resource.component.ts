import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';
import { FormGroup, FormControl, Validators,ValidatorFn, FormBuilder,ValidationErrors } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  form: FormGroup;

  housing: Housing = {
    name: null,
    email: null,
    phone: null,
    location: null,
    notes: null,
    term: null,
    gender: null,
    constraints: null
  };

  constructor(private fb :FormBuilder,private resourceService: ResourceService, public dialog: MatDialog,private router: Router
) {
      this.form = this.fb.group({
            name: ['', Validators.required ],
            email: [''],
            telephone:[''],
            location:[''],
            notes:[''],
            term:['',Validators.required],
            gender:[''],
            constraints:[''],
});
   }


  ngOnInit() {
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
      console.log('The dialog was closed');
      this.housing = new Housing();
    });
  }

  /**
   * Submit new resource
   * @memberof AddResourceComponent
   */
  submit() {
    this.resourceService.save('housing', this.form.value)
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
