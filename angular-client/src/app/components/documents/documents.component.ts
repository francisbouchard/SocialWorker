import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  @Input() orderedDocuments: any;
  @Input() participant: any;
  @Output() loadParticipant = new EventEmitter();

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
  }

  /**
 * Delete a document of a participant
 *
 * @param {any} documentID
 * @memberof DocumentsComponent
 */
  deleteDocument(documentID): void {
    this.participantService.deleteDocument(this.participant._id, documentID)
      .subscribe(result => {
        this.loadParticipant.emit();
      });
  }

}
