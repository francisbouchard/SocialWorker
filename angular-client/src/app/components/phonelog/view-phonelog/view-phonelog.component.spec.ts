import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../mocks/MockPhonelogService';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { ViewPhonelogComponent } from './view-phonelog.component';
import { Router } from '@angular/router';

describe('ViewPhonelogComponent', () => {
  let component: ViewPhonelogComponent;
  let fixture: ComponentFixture<ViewPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhonelogComponent ],
      providers:  [
        { provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: PhonelogService, useClass: MockPhonelogService },
        {provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl')}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
