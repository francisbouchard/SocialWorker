import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';
import { FormGroup, FormControl, Validators,ValidatorFn, FormBuilder,ValidationErrors } from "@angular/forms";


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
  }

  constructor(private fb :FormBuilder,private resourceService: ResourceService, public dialog: MatDialog) {
      this.form = this.fb.group({
            name: ['', Validators.required ],
            email: ['', Validators.required ],
            telephone:['', Validators.required ],
            location:['', Validators.required],
            notes:['', Validators.required],
            term:['', Validators.required],
            gender:['', Validators.required],
            constraints:['', Validators.required],
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
    let dialogRef = this.dialog.open(AlertModalComponent, {
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
        if (data.hasOwnProperty("errmsg")) {
          this.alertModal("Could not add new resource.");
        } else {
          this.alertModal("New resource successfully added.")
        }
      });
  }

}
