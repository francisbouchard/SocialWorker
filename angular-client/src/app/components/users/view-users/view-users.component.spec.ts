import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewUsersComponent } from './view-users.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { SearchPipe } from '../../../pipes/search.pipe';
import { UserService } from '../../../services/user.service';
import { MockUserService } from '../../../mocks/MockUserService';
import { Router } from '@angular/router';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUsersComponent, OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule ],
      providers: [ 
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy("navigateByUrl") } },
        // { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({_id: 'frontendtest'}) } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
