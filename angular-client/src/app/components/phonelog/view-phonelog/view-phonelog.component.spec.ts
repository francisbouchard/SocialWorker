import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PhonelogService } from '../../../services/phonelog.service';
import { MaterialsModule } from '../../../modules/materials.module';
import { MockPhonelogService } from '../../../mocks/MockPhonelogService';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { ViewPhonelogComponent } from './view-phonelog.component';
import { Router } from '@angular/router';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { EditPhonelogComponent } from '../edit-phonelog/edit-phonelog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchPipe } from '../../../pipes/search.pipe';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


describe('ViewPhonelogComponent', () => {
  let component: ViewPhonelogComponent;
  let fixture: ComponentFixture<ViewPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhonelogComponent,OrderByPipe,SearchPipe,EditPhonelogComponent],
      imports: [ MaterialsModule, RouterTestingModule ],
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
