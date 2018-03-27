import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParticipantService } from '../../../../services/participant.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() orderedNotes: any;
  @Input() participant: any;
  @Output() loadParticipant = new EventEmitter();

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
  }

/**
 * Deletes selected note
 *
 * @param {any} noteID
 * @memberof NotesComponent
 */
  deleteNote(noteID): void {
    this.participantService.deleteNote(this.participant._id, noteID)
      .subscribe(result => {
        this.loadParticipant.emit();
      });
  }

  /**
   * Download attachment related to note.
   * @param {String} fileName
   * @param {any} noteId
   * @memberof ParticipantProfileComponent
   */
  downloadAttachment(fileName, noteId) {
     this.participantService.downloadAttachment(this.participant._id, noteId).subscribe(
       data => {console.log(data); saveAs(data, fileName); }),
       error => console.log("Error downloading the file."),
       () => console.info("OK");
  }

}
