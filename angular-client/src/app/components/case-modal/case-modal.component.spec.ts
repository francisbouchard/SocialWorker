import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../modules/materials.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CaseModalComponent } from './case-modal.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { CasefileService } from '../../services/casefile.service';
import { MockCasefileService } from '../../mocks/MockCasefileService';

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
        {provide: CasefileService, useClass: MockCasefileService }
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
