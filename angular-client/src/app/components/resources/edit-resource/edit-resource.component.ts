import { Component, OnInit, Input } from '@angular/core';
import { Housing } from '../../../classes/housing';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {

  @Input() resource: Object;

  constructor() { }

  ngOnInit() {
    console.log(this.resource);
  }

}
