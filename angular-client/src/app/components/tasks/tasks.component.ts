import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  tasks = [
    {description: 'Need to do this', deadline: null},
    {description: 'Need to do that', deadline: null}
  ];

  constructor() { }

  ngOnInit() {
  }

}
