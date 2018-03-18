import { Component, OnInit } from '@angular/core';
import { CasefileService } from '../../services/casefile.service';

@Component({
  selector: 'app-active-casefiles',
  templateUrl: './active-casefiles.component.html',
  styleUrls: ['./active-casefiles.component.css']
})
export class ActiveCasefilesComponent implements OnInit {

  activeCases = [];

  constructor(private casefileService: CasefileService) { }

  ngOnInit() {
    this.loadAllActiveCases();
  }

  loadAllActiveCases() {
    this.casefileService.getAllActive().subscribe(data => {
      this.activeCases = data;
    });
  }

  loadUserActiveCases() {

  }


}
