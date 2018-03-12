import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardLinks = [
    {label: 'Tasks', icon: 'assignment'},
    {label: 'Casefiles', icon: 'folder'},
    {label: 'Phone Log', icon: 'phone'},
    {label: 'Manage Users', icon: 'supervisor_account'},
    {label: 'Statistics', icon: 'assessment'},
    {label: 'Trash Bin', icon: 'delete'}
  ];
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor() {
   }

  ngOnInit() {
  }

}
