import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { ParticipantService } from '../../../services/participant.service';
import { Router } from '@angular/router';
import { Document } from '../../../classes/document';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.css']
})
export class DocumentModalComponent implements OnInit {

  document: Document = {
    type: null,
    date: new Date(),
    attachment: null
  };
  file: FormData;
  loading: boolean = false;


  constructor(
    private participantService: ParticipantService,
    public dialogRef: MatDialogRef<DocumentModalComponent>,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private participant: any
  ) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Submit to save new document to participant
   *
   * @memberof DocumentComponent
   */
  submit() {
    this.loading = true;
    this.participantService.saveDocument(this.file, this.document, this.participant.id)
      .subscribe(data => {
        this.loading = false;
        this.dialogRef.close();
      });
    console.log(this.document);
  }

  /**
   * Close the document dialog modal
   *
   * @memberof DocumentComponent
   */
  cancel() {
    this.dialogRef.close();
  }

  /**
   * Read file input and store as the attachment
   *
   * @param {any} files
   * @memberof DocumentComponent
   */
  handleFileInput(files) {
    if (files) {
      const formData = new FormData();
      formData.append('attachment', files[0]);
      this.document.attachment = files[0].name;
      this.file = formData;
    }
  }

}
