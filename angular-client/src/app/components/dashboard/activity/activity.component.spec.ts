import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityComponent } from './activity.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { CasefileService } from '../../../services/casefile.service';
import { MockCasefileService } from '../../../services/mocks/MockCasefileService';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../services/mocks/MockPhonelogService';

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: CasefileService, useClass: MockCasefileService },
        { provide: PhonelogService, useClass: MockPhonelogService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
