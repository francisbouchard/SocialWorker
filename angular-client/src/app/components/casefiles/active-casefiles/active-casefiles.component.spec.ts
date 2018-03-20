import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCasefilesComponent } from './active-casefiles.component';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { SearchPipe } from '../../../pipes/search.pipe';
import { MaterialsModule } from '../../../modules/materials.module';
import { CasefileService } from '../../../services/casefile.service';
import { MockCasefileService } from '../../../services/mocks/MockCasefileService';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActiveCasefilesComponent', () => {
  let component: ActiveCasefilesComponent;
  let fixture: ComponentFixture<ActiveCasefilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCasefilesComponent, OrderByPipe, SearchPipe ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [ { provide: CasefileService, useClass: MockCasefileService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveCasefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
