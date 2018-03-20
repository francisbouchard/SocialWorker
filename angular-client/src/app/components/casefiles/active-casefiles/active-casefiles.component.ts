import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { CasefileService } from '../../../services/casefile.service';
import { Casefile } from '../../../classes/case';

@Component({
  selector: 'app-active-casefiles',
  templateUrl: './active-casefiles.component.html',
  styleUrls: ['./active-casefiles.component.css']
})
export class ActiveCasefilesComponent implements OnInit {

  activeCases = [];
  sortProperty = 'urgency';
  reverse = false;

  constructor(
    private casefileService: CasefileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadAllActiveCases();
  }

  loadAllActiveCases() {
    this.casefileService.getAllActive().subscribe(data => {
      if (data[0]) {
        const cases = data as Array<Casefile>;
        this.activeCases = cases.sort((case1, case2) => {
          return new Date(case2.date).getTime() - new Date(case1.date).getTime();
        });
      } else {
        this.activeCases = [];
      }
    });
  }

  viewParticipant(pid) {
    this.router.navigateByUrl(`/participant-profile/${pid}`);
  }


}
