import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditResourceComponent } from './edit-resource.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { ResourceService } from '../../../services/resource.service';

describe('EditResourceComponent', () => {
  let component: EditResourceComponent;
  let fixture: ComponentFixture<EditResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResourceComponent ],
      // imports: [ MaterialsModule ],
      providers: [ { provide: ResourceService, useValue: {} } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
