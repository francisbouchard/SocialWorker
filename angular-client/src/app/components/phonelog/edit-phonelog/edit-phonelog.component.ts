import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-phonelog',
  templateUrl: './edit-phonelog.component.html',
  styleUrls: ['./edit-phonelog.component.css']
})
export class EditPhonelogComponent implements OnInit {
  @Input() log: Object;

  constructor() { }

  ngOnInit() {
  }

}
