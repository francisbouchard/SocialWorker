import { Component, OnInit } from '@angular/core';
import { CasefileService } from '../../../services/casefile.service';
import { PhonelogService } from '../../../services/phonelog.service';
import { Casefile } from '../../../classes/case';
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
      if (data[0]) {
        const cases = data as Array<Casefile>;
        this.recentlyUpdatedCasefiles = cases.sort((case1, case2) => {
          return new Date(case2.date).getTime() - new Date(case1.date).getTime();
        });
      } else {
        this.recentlyUpdatedCasefiles = [];
      }
    });
  }

}
