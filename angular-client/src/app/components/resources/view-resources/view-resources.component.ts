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
  editingResource = Housing;

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

  edit(id, resource) {
    this.editingResource = resource;
  }

  update(id, resource) {
    this.resourceService.update('housing', id, resource)
    .subscribe(data => console.log(data));
  }

  cancel() {
    this.edit('', null);
  }

}
