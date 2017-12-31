import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-participant',
  templateUrl: './new-participant.component.html',
  styleUrls: ['./new-participant.component.css']
})
export class NewParticipantComponent implements OnInit {

  constructor() { }

  public name: String;
  public address: String;
  public telephone: String;
  public email: String;
  public socialmedia: String;

  ngOnInit() {
  }

  submit() {
    // Send to profile service
  }
}
