import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertModalComponent } from './alert-modal.component';
import { MaterialsModule } from '../../modules/materials.module';

describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule ],
      declarations: [ AlertModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
