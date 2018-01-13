import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { Housing } from '../../../classes/housing';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.css']
})
export class ViewResourcesComponent implements OnInit {

  @Input() hasTabChanged: boolean;
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
    .subscribe(data => {
      console.log(data);
      this.cancel();
    });
  }

  edit(id, resource) {
    this.editingResource = resource;
  }

  update(id, resource) {
    this.resourceService.update('housing', id, resource)
    .subscribe(data => {
      console.log(data);
      this.cancel();
    });
  }

  cancel() {
    this.edit('', null);
    this.loadAllResources();
  }

  checkResources(): boolean {
    if(this.hasTabChanged){
      this.loadAllResources();
      this.hasTabChanged = !this.hasTabChanged;
    }
    return true;
  }

}
