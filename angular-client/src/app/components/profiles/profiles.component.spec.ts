import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilesComponent } from './profiles.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ParticipantService } from '../../services/participant.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { Router } from '@angular/router';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesComponent ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [ { provide: ParticipantService, useClass: MockParticipantService },
        { provide: AuthenticationService, useClass: MockAuthenticationService }, 
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy("navigateByUrl") } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
