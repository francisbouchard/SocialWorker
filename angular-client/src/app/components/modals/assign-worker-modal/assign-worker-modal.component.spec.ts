import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignWorkerModalComponent } from './assign-worker-modal.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { ParticipantService } from '../../../services/participant.service';
import { MockParticipantService } from '../../../mocks/MockParticipantService';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../mocks/MockUserService';

describe('AssignWorkerModalComponent', () => {
  let component: AssignWorkerModalComponent;
  let fixture: ComponentFixture<AssignWorkerModalComponent>;

  beforeEach(async(() => {
    let participantData = {
      workers: [
        {
          'tokens': [],
          'role': 'admin',
          '_id': '5a6ca05f54297a0c500cbd41',
          'name': 'James',
          'email': 'james@astteq.org',
          'password': '$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC',
          'createdAt': '2018-01-27T15:53:03.674Z',
          'updatedAt': '2018-01-27T15:53:03.674Z',
          '__v': 0
        },
        {
          'tokens': [],
          'role': 'user',
          '_id': '5a6ff023a176b395fd54b228',
          'email': 'alyx@astteq.org',
          'name': 'Alyx',
          'password': '$2a$10$w.LhmqCc3o5XGJ4fnd7O5.b/7aE4OZVozEu0wzJ4CPq2.bIgp77XS',
          'createdAt': '2018-01-30T04:10:11.675Z',
          'updatedAt': '2018-01-30T04:10:11.675Z',
          '__v': 0
        }
      ]
    };
    TestBed.configureTestingModule({
      declarations: [AssignWorkerModalComponent],
      imports: [MaterialsModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: participantData },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ParticipantService, useClass: MockParticipantService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
