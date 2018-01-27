import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddResourceComponent } from './add-resource.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { ResourceService } from '../../../services/resource.service';
import { MockResourceService } from '../../../mocks/MockResourceService';

describe('AddResourceComponent', () => {
  let component: AddResourceComponent;
  let fixture: ComponentFixture<AddResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourceComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ResourceService, useClass: MockResourceService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
