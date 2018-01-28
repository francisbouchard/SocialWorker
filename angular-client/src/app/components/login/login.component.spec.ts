import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MaterialsModule } from '../../modules/materials.module';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService }, 
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy("navigateByUrl") } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
