import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  hasTabChanged = true;

  constructor(private resourceService: ResourceService) { }

  ngOnInit() {
  }

  changeTab() {
    this.hasTabChanged = !this.hasTabChanged;
  }

}
