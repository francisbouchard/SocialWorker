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
  public city: String;
  public provinces = [
    {value: "bc", viewValue: "British Columbia"},
    {value: "qc", viewValue: "Québec"},
    {value: "on", viewValue: "Ontario"},
    {value: "ns", viewValue: "Nova Scotia"},
    {value: "nb", viewValue: "New Brunswick"},
    {value: "mb", viewValue: "Manitoba"},
    {value: "pe", viewValue: "Prince Edward Island"},
    {value: "sk", viewValue: "Saskatchewan"},
    {value: "ab", viewValue: "Alberta"},
    {value: "nl", viewValue: "NewFoundland and Labrador"},
    {value: "nt", viewValue: "Northwest Territories"},
    {value: "yt", viewValue: "Yukon"},
    {value: "nu", viewValue: "Nunavut"}

  ]
  public postalcode: String;

  ngOnInit() {
  }

  submit(){
    //Send to profile service
  }
}
