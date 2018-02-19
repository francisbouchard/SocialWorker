import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../../modules/materials.module';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../mocks/MockPhonelogService';
import { Router } from '@angular/router';

import { AddPhonelogComponent } from './add-phonelog.component';

describe('AddPhonelogComponent', () => {
  let component: AddPhonelogComponent;
  let fixture: ComponentFixture<AddPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhonelogComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService},
        { provide: PhonelogService, useClass: MockPhonelogService },
       {provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl')}},
        MatDialog
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
