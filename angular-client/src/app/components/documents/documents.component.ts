import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParticipantService } from '../../services/participant.service';
import { saveAs } from 'file-saver';

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
     * Download document.
     * @param {String} fileName
     * @param {any} documentId
     * @memberof ParticipantProfileComponent
   */
  downloadDocument(fileName, documentId) {
      this.participantService.downloadDocument(this.participant._id, documentId).subscribe(
        data => {console.log(data); saveAs(data, fileName);  }),
        error => console.log("Error downloading the file."),
        () => console.info("OK");
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
