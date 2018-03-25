import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardLinks = [
    {label: 'Dashboard', icon: 'home', path: 'activity'},
    {label: 'Tasks', icon: 'assignment', path: 'tasks'},
    {label: 'Active Case Files', icon: 'folder', path: 'active-casefiles'},
    {label: 'Phone Log', icon: 'phone', path: 'phonelog'},
    {label: 'Follow Up', icon: 'alert', path: 'callback'},    
    {label: 'Manage Users', icon: 'supervisor_account', path: 'users'},
    {label: 'Reports', icon: 'assessment', path: 'reports'},
    {label: 'Trash Bin', icon: 'delete', path: 'trashbin'}
  ];

  constructor(private authenticationService: AuthenticationService) {
   }

  ngOnInit() {
  }

}
