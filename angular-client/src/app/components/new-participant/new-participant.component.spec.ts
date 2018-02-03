import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../modules/materials.module';
import { NewParticipantComponent } from './new-participant.component';
import { ParticipantService } from '../../services/participant.service';
import { MatDialog } from '@angular/material';
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { Router } from '@angular/router';

describe('NewParticipantComponent', () => {
  let component: NewParticipantComponent;
  let fixture: ComponentFixture<NewParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParticipantComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: ParticipantService, useClass: MockParticipantService }, 
        MatDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
