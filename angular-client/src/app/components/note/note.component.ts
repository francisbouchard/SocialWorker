import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParticipantService } from '../../services/participant.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RouterModule, Router } from '@angular/router';
import { Note } from '../../classes/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  note: Note = {
    text: "",
    date: new Date(),
    attachment: null
  };

  constructor(
    private participantService: ParticipantService,
    public dialogRef: MatDialogRef<NoteComponent>,
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
    this.participantService.saveNote(this.note, this.participant.id)
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
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event: Event) => {
        this.note.attachment = reader.result;
      };

    }
  }

}
