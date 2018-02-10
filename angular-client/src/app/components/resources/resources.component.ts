import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../../services/resource.service';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  hasTabChanged = true;

  constructor(private resourceService: ResourceService, public authService: AuthenticationService, public router: Router) { }

  ngOnInit() {
    if (!this.authService.loggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  changeTab() {
    this.hasTabChanged = !this.hasTabChanged;
  }

}
