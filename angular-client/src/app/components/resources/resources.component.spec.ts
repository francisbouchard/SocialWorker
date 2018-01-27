import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ResourcesComponent } from './resources.component';
import { ResourceService } from '../../services/resource.service';
import { MaterialsModule } from '../../modules/materials.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewResourcesComponent } from './view-resources/view-resources.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { MockResourceService } from '../../mocks/MockResourceService';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';

describe('ResourcesComponent', () => {
  let component: ResourcesComponent;
  let fixture: ComponentFixture<ResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourcesComponent, ViewResourcesComponent, AddResourceComponent, EditResourceComponent ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [ { provide: ResourceService, useClass: MockResourceService },
        { provide: AuthenticationService, useClass: MockAuthenticationService }, 
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy("navigateByUrl") } } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
