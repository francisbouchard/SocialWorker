import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Housing } from '../../../classes/housing';

import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, ValidationErrors } from '@angular/forms';
import { ResourceService } from '../../../services/resource.service';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit, OnChanges {

  @Input() resource: any;
  @Output() cancel = new EventEmitter();
  resourceForm: FormGroup;
  phoneregex = /^(\d){3}(-|\.|\s|\()?(\d){3}(-|\.|\s|\()?(\d){4}$/m;

  constructor(
    private form: FormBuilder,
    private resourceService: ResourceService) {
    this.createForm();
   }

  ngOnInit() {
  }

  ngOnChanges() {
    this.resourceForm.patchValue({
      name: this.resource.name,
      term: this.resource.term,
      email: this.resource.email,
      phone: this.resource.phone,
      location: this.resource.location,
      notes: this.resource.notes,
      gender: this.resource.gender,
      constraints: this.resource.constraints
    });
  }

  createForm() {
    this.resourceForm = this.form.group({
      name: ['', Validators.required],
      term: '',
      email: '',
      phone: ['', Validators.pattern(this.phoneregex)],
      location: '',
      notes: '',
      gender: '',
      constraints: ''
    });
  }

  cancelEdit() {
    this.cancel.emit();
  }

  update() {
    const resource = this.resourceForm.value;
    const id = this.resource._id;
    this.resourceService.update('housing', id, resource)
      .subscribe(data => {
        this.cancelEdit();
      });
  }

  delete() {
    const id = this.resource._id;
    this.resourceService.delete(id)
      .subscribe(data => {
        this.cancelEdit();
      });
  }

}
