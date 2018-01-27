import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditResourceComponent } from './edit-resource.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { ResourceService } from '../../../services/resource.service';
import { MockResourceService } from '../../../mocks/MockResourceService';

describe('EditResourceComponent', () => {
  let component: EditResourceComponent;
  let fixture: ComponentFixture<EditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourceComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ResourceService, useClass: MockResourceService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceComponent);
    component = fixture.componentInstance;
    component.resource = {
      "constraints": [],
      "kind": "Housing",
      "_id": "5a6cac2bdf03f80ede3f5c3e",
      "name": "Housing Facility Name",
      "email": "housing@resource.com",
      "term": "5 weeks",
      "createdAt": "2018-01-27T16:43:26.756Z",
      "updatedAt": "2018-01-27T16:43:26.756Z",
      "__v": 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
