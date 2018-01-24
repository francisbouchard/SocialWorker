import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParticipantService } from '../../services/participant.service';
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
  }

  constructor(
    private participantService: ParticipantService,
    public dialogRef: MatDialogRef<NoteComponent>,
    @Inject(MAT_DIALOG_DATA) private participant: any) { }

  ngOnInit() {
  }

  submit(): void {
    this.participantService.saveNote(this.note, this.participant.id)
    .subscribe(data => {
      console.log(data);
      this.dialogRef.close();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  handleFileInput(files) {
    console.log(files);
  }

}
