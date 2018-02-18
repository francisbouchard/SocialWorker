import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { ParticipantService } from '../../services/participant.service';
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { DocumentComponent } from './document.component';
import { MaterialsModule } from '../../modules/materials.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('DocumentComponent', () => {
  let component: DocumentComponent;
  let fixture: ComponentFixture<DocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentComponent ],
      imports: [ MaterialsModule ],
      providers: [
        {provide: ParticipantService, useClass: MockParticipantService},
        {provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        {provide: MatDialogRef, useValue: {} },
        {provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
