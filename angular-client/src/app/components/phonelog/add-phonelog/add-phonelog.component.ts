import { Component, OnInit, Input } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Phonelog } from '../../../classes/phonelog';
import { PhonelogService } from '../../../services/phonelog.service';

@Component({
  selector: 'app-add-phonelog',
  templateUrl: './add-phonelog.component.html',
  styleUrls: ['./add-phonelog.component.css']
})
export class AddPhonelogComponent implements OnInit {
  phonelogData: Phonelog = {
    name: '',
    pronouns: '',
    user: '',
    urgent: false,
    phonenumber: '',
    subject: '',
    notes: ''
  };

  constructor(
    private phonelogService: PhonelogService,
    public dialog: MatDialog,
    public router: Router,
    public authService: AuthenticationService,
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Alert user of response success or fail.
   *
   * @param {any} message
   * @memberof AddPhonelogComponent
   */
  alertModal(message): void {
    const dialogRef = this.dialog.open(AlertModalComponent, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  /**
   * Submit new phonelog entry.
   *
   * @memberof AddPhonelogComponent
   */
  submit() {
    this.phonelogService.save(this.phonelogData)
      .subscribe(data => {
        if (data.hasOwnProperty('errmsg')) {
          this.alertModal('Could not add new phonelog entry.');
        } else {
          this.alertModal('Phonelog entry successfully added.');
        }
      });
  }

}
