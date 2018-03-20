import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParticipantService } from '../../../services/participant.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Note } from '../../../classes/note';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css']
})
export class NoteModalComponent implements OnInit {

  note: Note = {
    text: '',
    date: new Date(),
    attachment: null
  };
  file: FormData;

  constructor(
    private participantService: ParticipantService,
    public dialogRef: MatDialogRef<NoteModalComponent>,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private participant: any) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  /**
   * Submit to save a new note for a participant
   *
   * @memberof NoteComponent
   */
  submit(): void {
    this.participantService.saveNote(this.file, this.note, this.participant.id)
      .subscribe(data => {
        this.dialogRef.close();
      });
  }

  /**
   * Close the note dialog modal
   *
   * @memberof NoteComponent
   */
  cancel(): void {
    this.dialogRef.close();
  }

  /**
   * Read file input and store as attachment
   *
   * @param {any} files
   * @memberof NoteComponent
   */
  handleFileInput(files) {
    if (files) {
      const formData = new FormData();
      formData.append('attachment', files[0]);
      this.note.attachment = files[0].name;
      this.file = formData;
    }
  }

}
