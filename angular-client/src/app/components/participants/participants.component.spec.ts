import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantsComponent } from './participants.component';
import { ResourceService } from '../../services/resource.service';
import { MaterialsModule } from '../../modules/materials.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewParticipantsComponent } from './view-participants/view-participants.component';
import { AddParticipantComponent } from './add-participant/add-participant.component';
import { EditParticipantComponent } from './edit-participant/edit-participant.component'; //TODO
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { ParticipantService } from '../../services/participant.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { OrderByPipe } from '../../pipes/orderBy.pipe';
import { SearchPipe } from '../../pipes/search.pipe';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsComponent,
         EditParticipantComponent,
         ViewParticipantsComponent,
         AddParticipantComponent,
         OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [ { provide: ParticipantService, useClass: MockParticipantService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
