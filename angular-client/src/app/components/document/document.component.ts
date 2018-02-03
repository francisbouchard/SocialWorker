import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Document } from '../../classes/document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  document: Document = {
    type: null,
    date: new Date(),
    attachment: null
  };


  constructor(
    public dialogRef: MatDialogRef<DocumentComponent>,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private participantID: any
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  submit() {
    // TODO
    console.log(this.document);
  }

  cancel() {
    // TODO
  }

}
