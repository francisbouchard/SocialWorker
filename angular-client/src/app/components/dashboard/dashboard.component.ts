import { Component, OnInit } from '@angular/core';

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
    {label: 'Manage Users', icon: 'supervisor_account', path: 'users'},
    {label: 'Reports', icon: 'assessment', path: 'reports'},
    {label: 'Trash Bin', icon: 'delete', path: 'trashbin'}
  ];

  constructor() {
   }

  ngOnInit() {
  }

}
