import { Component, OnInit } from '@angular/core';
import {ProfilesService} from'../../../providers/profilesService';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
  providers: [ProfilesService]
})
export class ProfilesComponent {
  public profiles;
  constructor(public profilesService: ProfilesService) { 
    
  }

 loadProfiles() {
    let that = this;
    this.profilesService.getAll()
      .then(profile => {
        console.log(profile)
        that.profiles = profile;
        })
      }
      
  ngOnInit() {
  this.loadProfiles() 
  }

  
}


 