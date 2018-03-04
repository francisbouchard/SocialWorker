import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParticipantService } from '../../../../services/participant.service';

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

}
