import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CasefileService } from '../../../../services/casefile.service';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Casefile } from '../../../../classes/case';
import { ValidatorFn } from '@angular/forms/src/directives/validators';

@Component({
  selector: 'app-casefiles',
  templateUrl: './casefiles.component.html',
  styleUrls: ['./casefiles.component.css']
})
export class CasefilesComponent implements OnInit {

  @Input() orderedCases: any;
  @Input() participant: any;
  @Output() loadParticipant = new EventEmitter();
  editedCasefile: any;
  casefileFormNote: FormGroup;
  casefileFormSelectedResource: FormGroup;
  casefileFormContactedResources: FormGroup;
  isDateRange = true;
  startDate = new Date();
  dateRange = ['Switch to date range', 'Switch to single date'];
  dateRangeText = this.dateRange[1];
  isEditingSelectedResource = true;

  constructor(
    private casefileService: CasefileService,
    private form: FormBuilder
  ) { }

  ngOnInit() {
  }

  /**
   * Initialize forms
   *
   * @param {any} casefile
   * @memberof CasefilesComponent
   */
  setEditedCasefile(casefile) {
    this.editedCasefile = casefile;
    this.isEditingSelectedResource = (casefile.selectedResource) ? false : true;
    this.createFormNote();
    this.createFormSelectedResource();
    this.createFormContactedResources();
    this.setContactedResources(this.editedCasefile.contactedResources);
  }


  /**
   * Create form for casefile note
   *
   * @memberof CasefilesComponent
   */
  createFormNote() {
    this.casefileFormNote = this.form.group({
      notes: this.editedCasefile.notes[0] || ''
    });
  }

  /**
   * Create form for selected resource
   *
   * @memberof CasefilesComponent
   */
  createFormSelectedResource() {
    this.casefileFormSelectedResource = this.form.group({
      resource: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, (this.isDateRange) ? Validators.required : null]
    });
  }

  /**
   * Create form for array of contacted resources
   *
   * @memberof CasefilesComponent
   */
  createFormContactedResources() {
    this.casefileFormContactedResources = this.form.group({
      resources: this.form.array([])
    });
  }

  /**
   * Set resources as form groups for contacted resources form array
   *
   * @param {ContactedResource[]} resources
   * @memberof CasefilesComponent
   */
  setContactedResources(resources: ContactedResource[]) {
    const resourceFGs = resources.map(resource => this.form.group(resource));
    const resourceFormArray = this.form.array(resourceFGs);
    this.casefileFormContactedResources.setControl('resources', resourceFormArray);
  }

  get resources(): FormArray {
    return this.casefileFormContactedResources.get('resources') as FormArray;
  }

  /**
   * Update casefile note
   *
   * @param {any} casefile
   * @memberof CasefilesComponent
   */
  updateCaseNote(casefile) {
    // TODO: update only if the text value has changed
    const noteFormModel = this.casefileFormNote.value;
    this.casefileService.updateCaseNote(casefile._id, noteFormModel).subscribe();
  }


  /**
   * Update casefile's resource date of contact
   *
   * @param {any} isResourceContacted
   * @param {any} resourceIndex
   * @memberof CasefilesComponent
   */
  updateCaseResourceDate(isResourceContacted, resourceIndex): void {

    const casefileID = this.editedCasefile._id;
    const resourceID = this.casefileFormContactedResources.value.resources[resourceIndex].resource._id;
    const dateContacted = this.casefileFormContactedResources.value.resources[resourceIndex].dateContacted;
    let date;
    if (isResourceContacted) {
      date = (dateContacted != null) ? dateContacted : new Date();
    } else {
      date = null;
    }

    this.editedCasefile.contactedResources[resourceIndex].dateContacted = date;
    this.editedCasefile.contactedResources[resourceIndex].isContacted = isResourceContacted;
    this.setContactedResources(this.editedCasefile.contactedResources);

    this.casefileService.updateCaseContactedResource(
      casefileID,
      resourceID,
      { 'isContacted': isResourceContacted, 'dateContacted': date }
    ).subscribe();
  }

  /**
   * Update casefile's resource note
   *
   * @param {any} isEditing
   * @param {any} resourceIndex
   * @memberof CasefilesComponent
   */
  updateCaseResourceNote(isEditing, resourceIndex) {
    const casefileID = this.editedCasefile._id;
    const resourceID = this.casefileFormContactedResources.value.resources[resourceIndex].resource._id;
    let comment;
    if (isEditing) {
      comment = null;
    } else {
      comment = this.casefileFormContactedResources.value.resources[resourceIndex].note;
    }
    this.editedCasefile.contactedResources[resourceIndex].note = comment;
    this.setContactedResources(this.editedCasefile.contactedResources);

    this.casefileService.updateCaseContactedResource(casefileID, resourceID, { 'note': comment }).subscribe();
  }



  /**
   * Update casefile with selected resource
   *
   * @param {any} selectedResource
   * @memberof CasefilesComponent
   */
  updateCaseSelectedResource(selectedResource) {

    this.casefileFormSelectedResource.patchValue({
      resource: selectedResource.resource,
      startDate: selectedResource.startDate,
      endDate: selectedResource.endDate
    });

    this.isEditingSelectedResource = true;
  }

  /**
   * Save selected resource to database
   *
   * @param {any} casefile
   * @memberof CasefilesComponent
   */
  saveCaseSelectedResource(casefile) {
    const selectedResourceFormModel = this.casefileFormSelectedResource.value;
    selectedResourceFormModel.resource = selectedResourceFormModel.resource.resource;
    selectedResourceFormModel.endDate = (this.isDateRange) ? selectedResourceFormModel.endDate : null;
    const selectedResourceObject = { 'selectedResource': selectedResourceFormModel };

    this.casefileService.updateCaseSelectedResource(casefile._id, selectedResourceObject).subscribe(data => {
      casefile.selectedResource = selectedResourceFormModel;
      this.isEditingSelectedResource = false;
    });
  }

  /**
   * Clear a selected resource
   *
   * @param {any} casefile
   * @memberof CasefilesComponent
   */
  removeCaseSelectedResource(casefile) {
    this.casefileService.updateCaseSelectedResource(casefile._id, { 'selectedResource': null }).subscribe(data => {
      casefile.selectedResource = null;
      this.casefileFormSelectedResource.reset({});
    });
  }

  /**
   * Switch between date range to single date
   *
   * @memberof CasefilesComponent
   */
  switchDateRange() {
    this.isDateRange = !this.isDateRange;
    this.dateRangeText = (this.isDateRange) ? this.dateRange[1] : this.dateRange[0];
    this.createFormSelectedResource();
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

export class ContactedResource {
  note = '';
  resource = '';
  isContacted = '';
  dateContacted = '';
  _id = '';
}
