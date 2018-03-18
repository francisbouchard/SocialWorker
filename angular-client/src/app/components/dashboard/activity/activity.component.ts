import { Component, OnInit } from '@angular/core';
import { CasefileService } from '../../../services/casefile.service';
import { PhonelogService } from '../../../services/phonelog.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  recentlyUpdatedCasefiles: Object[];

  constructor(
    private casefileService: CasefileService
  ) { }

  ngOnInit() {
    this.loadRecentCasefiles();
  }

  loadRecentCasefiles() {
    this.casefileService.getRecentlyUpdated().subscribe( data => {
      this.recentlyUpdatedCasefiles = data;
    });
  }

}
