import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  constructor() { }

  public name: String;
  public address: String;
  public telephone: String;
  public city: String;
  public province: String;
  public postalcode: String;

  ngOnInit() {
  }

  submit(){
    //Send to profile service
  }

}
