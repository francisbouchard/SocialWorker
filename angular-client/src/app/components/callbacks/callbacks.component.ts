import { Component, OnInit } from '@angular/core';
import {CallbacksService } from '../../services/callbacks.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-callbacks',
  templateUrl: './callbacks.component.html',
  styleUrls: ['./callbacks.component.css']
})
export class CallbacksComponent implements OnInit {
  
  form: FormGroup;
  callbacks: Object[];

  constructor(private formBuilder: FormBuilder, private callbacksService: CallbacksService) {

   }

  ngOnInit() {
  }
  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  loadCallbacks() {
    this.callbacksService.getByUser().subscribe(data => {
      this.callbacks = data;
    })
  }

  saveCallbacks() {
    this.callbacksService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        this.loadCallbacks();
      });
  }

  deleteTask(callbackID: String) {
    this.callbacksService.delete(callbackID)
      .subscribe(data => {
        console.log(data);
      });
  }

}
