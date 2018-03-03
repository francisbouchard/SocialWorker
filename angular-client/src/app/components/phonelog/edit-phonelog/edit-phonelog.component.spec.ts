import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPhonelogComponent } from './edit-phonelog.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { PhonelogService } from '../../../services/phonelog.service';
import { MockPhonelogService } from '../../../mocks/MockPhonelogService';

describe('EditPhonelogComponent', () => {
  let component: EditPhonelogComponent;
  let fixture: ComponentFixture<EditPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonelogComponent ],
      imports: [MaterialsModule],
      providers: [{provide: PhonelogService, useClass: MockPhonelogService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonelogComponent);
    component = fixture.componentInstance;
    component.log = {
    'name': 'testing',
    'pronouns': 'him',
    'user': 'random',
    'urgent': 'true',
    'phonenumber': '514632182',
    'subject': 'test',
    'notes': 'testing',
    'callertype': 'test',
      '__v': 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
