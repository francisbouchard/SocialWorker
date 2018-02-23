import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  // TODO replace with db data
  items = [
    {
      name: 'Judith',
      username: 'J123'
    },
    {
      name: 'Darlene',
      username: 'd12345'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
