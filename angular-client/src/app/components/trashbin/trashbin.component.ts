import { Component, OnInit } from '@angular/core';
import { TrashService } from '../../services/trash.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-trashbin',
  templateUrl: './trashbin.component.html',
  styleUrls: ['./trashbin.component.css']
})
export class TrashbinComponent implements OnInit {

  items = [];

  constructor(public authService: AuthenticationService,
    private trashService: TrashService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loadTrashRecords();
  }

  delete(itemModel: String, itemID: String) {
    this.confirmModal('Are you sure you want to permanently delete this record?').subscribe(result => {
      if (result) {
        this.trashService.deletePermanently(itemModel, itemID)
          .subscribe(data => {
            console.log(data);
            this.loadTrashRecords();
          });
      }
    });
  }

  restore(itemModel: String, itemID: String) {
    this.confirmModal('Are you sure you want to restore this record?').subscribe(result => {
      if (result) {
        this.trashService.restore(itemModel, itemID)
          .subscribe(data => {
            console.log(data);
            this.loadTrashRecords();
          });
      }
    });
  }

  loadTrashRecords(): void {
    this.trashService.getAll()
      .subscribe((data: [any]) => {
        this.items = data;
      });
  }

  confirmModal(message): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '250px',
      data: { message: message },
      disableClose: false
    });
    return dialogRef.afterClosed();
  }

}
