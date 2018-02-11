import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewResourcesComponent } from './view-resources.component';
import { ResourceService } from '../../../services/resource.service';
import { MaterialsModule } from '../../../modules/materials.module';
import { MockResourceService } from '../../../mocks/MockResourceService';
import { EditResourceComponent } from '../edit-resource/edit-resource.component';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { SearchPipe } from '../../../pipes/search.pipe';

describe('ViewResourcesComponent', () => {
  let component: ViewResourcesComponent;
  let fixture: ComponentFixture<ViewResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResourcesComponent, EditResourceComponent, OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ResourceService, useClass: MockResourceService } ]
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
