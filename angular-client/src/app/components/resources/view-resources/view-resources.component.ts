import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { Housing } from '../../../classes/housing';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.css']
})
export class ViewResourcesComponent implements OnInit {

  resources: Object;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.loadAllResources();
  }

  loadAllResources() {
    this.resourceService.getAll()
    .subscribe(data => {
      console.log(data);
      this.resources = data;
    });
  }

  delete(id) {
    this.resourceService.delete(id)
    .subscribe(data => console.log(data));
  }

}
