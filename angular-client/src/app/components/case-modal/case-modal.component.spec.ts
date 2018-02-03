import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../modules/materials.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CaseModalComponent } from './case-modal.component';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { CasefileService } from '../../services/casefile.service';
import { MockCasefileService } from '../../mocks/MockCasefileService';
import { ResourceService } from '../../services/resource.service';
import { MockResourceService } from '../../mocks/MockResourceService';
import { ParticipantService } from '../../services/participant.service';
import { MockParticipantService } from '../../mocks/MockParticipantService';

import { Router } from '@angular/router';

describe('CaseModalComponent', () => {
  let component: CaseModalComponent;
  let fixture: ComponentFixture<CaseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, MatDialogModule, FormsModule ],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: AuthenticationService, useClass: MockAuthenticationService },
        {provide: CasefileService, useClass: MockCasefileService },
        {provide: ResourceService, useClass: MockResourceService},
        {provide: ParticipantService, useClass: MockParticipantService},
        {provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ],
      declarations: [ CaseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
