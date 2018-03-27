import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '../../../services/resource.service';
import { Resource } from '../../../classes/resource';
import { Housing } from '../../../classes/housing';
import { Medical } from '../../../classes/medical';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.component.html',
  styleUrls: ['./view-resources.component.css']
})
export class ViewResourcesComponent implements OnInit {

  @Input() hasTabChanged: boolean;
  resources: Object;
  editingResource = Resource;
  public sortProperty = 'name';
  public reverse = false;
  public query: string;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
    this.loadAllResources();
  }

  /**
   * Load all resources
   *
   * @memberof ViewResourcesComponent
   */
  loadAllResources() {
    this.resourceService.getAll()
      .subscribe(data => {
        console.log(data);
        this.resources = data;
      });
  }

  /**
   * Specify which resource is currently in edit mode
   *
   * @param {any} id
   * @param {any} resource
   * @memberof ViewResourcesComponent
   */
  edit(id, resource) {
    this.editingResource = resource;
  }

  /**
   * Cancel edit mode and return to view mode
   *
   * @memberof ViewResourcesComponent
   */
  cancel() {
    this.edit('', null);
    this.loadAllResources();
  }

  /**
   * Reload resources after navigating between tabs
   *
   * @returns {boolean}
   * @memberof ViewResourcesComponent
   */
  checkResources(): boolean {
    if (this.hasTabChanged) {
      this.loadAllResources();
      this.hasTabChanged = !this.hasTabChanged;
    }
    return true;
  }

}
