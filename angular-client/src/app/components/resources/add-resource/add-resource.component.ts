import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertModalComponent } from '../../alert-modal/alert-modal.component';
import { Housing } from '../../../classes/housing';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

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

  constructor(private resourceService: ResourceService, public dialog: MatDialog) { }

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
    this.resourceService.save('housing', this.housing)
      .subscribe(data => {
        if (data.hasOwnProperty("errmsg")) {
          this.alertModal("Could not add new resource.");
        } else {
          this.alertModal("New resource successfully added.")
        }
      });
  }

}