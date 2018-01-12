import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { Housing } from '../../../classes/housing';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  housing: Housing = {
    name: null,
    email: null,
    phone: null,
    location: null,
    notes: null,
    term: null,
    gender: null,
    constraints: null
  }

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
  }

  /**
   * Submit new resource
   * @memberof AddResourceComponent
   */
  submit() {
    this.resourceService.save('housing', this.housing)
      .subscribe(data => console.log(data));
  }

}
