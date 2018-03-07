import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResourcesComponent } from './view-resources.component';
import { ResourceService } from '../../../services/resource.service';
import { MaterialsModule } from '../../../modules/materials.module';
import { MockResourceService } from '../../../mocks/MockResourceService';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { EditResourceComponent } from '../edit-resource/edit-resource.component';
import { Router } from '@angular/router';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { SearchPipe } from '../../../pipes/search.pipe';

describe('ViewResourcesComponent', () => {
  let component: ViewResourcesComponent;
  let fixture: ComponentFixture<ViewResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResourcesComponent,
        EditResourceComponent, OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule ],
      providers: [
        { provide: ResourceService, useClass: MockResourceService },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
