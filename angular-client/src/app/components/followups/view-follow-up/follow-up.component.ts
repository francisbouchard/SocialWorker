import { Component, OnInit } from '@angular/core';
import {FollowUpService } from '../../services/followups.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-followups',
  templateUrl: './followups.component.html',
  styleUrls: ['./followups.component.css']
})
export class FollowUpComponent implements OnInit {
  
  form: FormGroup;
  followups: Object[];

  constructor(private formBuilder: FormBuilder, private followupsService: FollowUpService) {

   }

  ngOnInit() {
  }
  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  loadFollowUp() {
    this.followupsService.getByUser().subscribe(data => {
      this.followups = data;
    })
  }

  saveFollowUp() {
    this.followupsService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        this.loadFollowUp();
      });
  }

  deleteTask(followupID: String) {
    this.followupsService.delete(followupID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
