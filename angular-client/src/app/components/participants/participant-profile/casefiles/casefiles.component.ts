import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CasefileService } from '../../../../services/casefile.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-casefiles',
  templateUrl: './casefiles.component.html',
  styleUrls: ['./casefiles.component.css']
})
export class CasefilesComponent implements OnInit {

  @Input() orderedCases: any;
  @Input() participant: any;
  @Output() loadParticipant = new EventEmitter();
  selectedResource = {
    resource: null,
    startDate: new Date(),
    endDate: null,
  };
  startDate = new Date();
  dateRange = ['Switch to date range', 'Switch to single date'];
  dateRangeText = this.dateRange[1];
  isDateRange = true;

  // NEW PARAMS
  casefileFormNote: FormGroup;
  editedCasefile: any;

  constructor(
    private casefileService: CasefileService,
    private form: FormBuilder,
  ) { }

  ngOnInit() {
  }

  setEditedCasefile(casefile) {
    this.editedCasefile = casefile;
    this.createFormNote();
  }

  createFormNote() {
    this.casefileFormNote = this.form.group({
      notes: this.editedCasefile.notes[0] || ''
    });
  }

  /**
   * Update casefile note
   * Casefile note will only update if the text value was changed
   *
   * @param {any} casefile
   * @param {any} updatedNote
   * @memberof ParticipantProfileComponent
   */
  updateCaseNote(casefile) {
    const noteFormModel = this.casefileFormNote.value;
    this.casefileService.updateCaseNote(casefile._id, noteFormModel ).subscribe();
  }


  /**
 * Update casefile's resource date of contact
 *
 * @param {any} isResourceContacted
 * @param {any} casefile
 * @param {any} resource
 * @param {any} casefileIndex
 * @param {any} resourceIndex
 * @param {Date} dateInput
 * @memberof CasefilesComponent
 */
  updateCaseDate(isResourceContacted, casefile, resource, casefileIndex, resourceIndex, dateInput: Date): void {

    const casefileID = casefile._id;
    const resourceID = resource.resource._id;
    const dateContacted = resource.dateContacted;
    const status = (isResourceContacted) ? 'Contacted' : 'To Contact';
    let date;
    if (isResourceContacted) {
      date = (dateContacted) ? dateContacted : (dateInput || new Date());
    } else {
      date = null;
    }
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].dateContacted = date;
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].status = status;

    this.casefileService.updateCaseContactedResource(casefileID, resourceID, { 'status': status, 'dateContacted': date }).subscribe();
  }

  /**
   * Update a casefile's resource comment
   *
   * @param {any} casefile
   * @param {any} resource
   * @param {any} comment
   * @memberof CasefilesComponent
   */
  updateCaseResourceNote(casefile, resource, comment, casefileIndex, resourceIndex) {
    this.orderedCases[casefileIndex].contactedResources[resourceIndex].note = comment;
    this.casefileService.updateCaseContactedResource(casefile._id, resource.resource._id, { 'note': comment }).subscribe();
  }



  /**
   * Update casefile with selected resource
   *
   * @param {any} casefile
   * @param {any} selection
   * @memberof CasefilesComponent
   */
  updateCaseSelectedResource(casefile, selection) {

    if (selection) {
      this.selectedResource.resource = selection.resource;
    } else {
      this.selectedResource.resource = null;
      this.selectedResource.startDate = null;
      this.selectedResource.endDate = null;
      casefile.selectedResource = null;
    }
  }

  /**
 * Add single date or date range to selected resource
 * Does not save this to the database
 *
 * @param {any} casefile
 * @param {any} input
 * @memberof CasefilesComponent
 */
  updateCaseSelectedResourceDate(casefile, input) {
    this.selectedResource.startDate = (input.targetElement.name === 'startDate') ? input.value : this.selectedResource.startDate;
    this.selectedResource.endDate = (input.targetElement.name === 'endDate') ? input.value : this.selectedResource.endDate;
    this.startDate = this.selectedResource.startDate;
  }

  /**
   * Save selected resource to database
   *
   * @param {any} casefile
   * @memberof CasefilesComponent
   */
  saveCaseSelectedResource(casefile) {
    const selectedResourceObject = { 'selectedResource': ((this.selectedResource.resource) ? this.selectedResource : null) };
    casefile.selectedResource = (this.selectedResource.resource) ? this.selectedResource : null;
    this.casefileService.updateCaseSelectedResource(casefile._id, selectedResourceObject).subscribe();
  }

  /**
   * Check if selected resource has a resource and dates are valid
   *
   * @memberof CasefilesComponent
   */
  caseSelectedResourceIsInvalid(): boolean {
    if ((this.selectedResource.endDate > this.selectedResource.startDate) && this.selectedResource.resource) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Switch between date range to single date
   *
   * @memberof CasefilesComponent
   */
  switchDateRange() {
    this.isDateRange = !this.isDateRange;
    this.dateRangeText = (this.isDateRange) ? this.dateRange[1] : this.dateRange[0];
    this.selectedResource.endDate = null;
  }

  /**
   * Reset default values when closing panels
   *
   * @memberof ParticipantProfileComponent
   */
  resetDateSwitcher() {
    this.isDateRange = true;
  }

  /**
 * Complete a casefile
 *
 * @param {any} casefile
 * @param {any} casefileIndex
 * @memberof CasefilesComponent
 */
  completeCasefile(casefile, casefileIndex): void {
    this.orderedCases[casefileIndex].status = 'Completed';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'Completed' }).subscribe();
  }

  /**
   * Reopen a casefile
   *
   * @param {any} casefile
   * @param {any} casefileIndex
   * @memberof CasefilesComponent
   */
  reopenCasefile(casefile, casefileIndex): void {
    this.orderedCases[casefileIndex].status = 'In progress';
    this.casefileService.updateCaseStatus(casefile._id, { status: 'In progress' }).subscribe();
  }

  /**
   * Deletes selected casefile
   *
   * @param {any} casefileID
   * @memberof CasefilesComponent
   */
  deleteCasefile(casefileID): void {
    this.casefileService.delete(casefileID)
      .subscribe(result => {
        this.loadParticipant.emit();
      });
  }

}
