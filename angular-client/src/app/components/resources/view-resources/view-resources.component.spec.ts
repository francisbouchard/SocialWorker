import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResourcesComponent } from './view-resources.component';
import { ResourceService } from '../../../services/resource.service';
import { MaterialsModule } from '../../../modules/materials.module';

describe('ViewResourcesComponent', () => {
  let component: ViewResourcesComponent;
  let fixture: ComponentFixture<ViewResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResourcesComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ResourceService, useValue: {} } ]
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
