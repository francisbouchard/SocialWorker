import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhonelogComponent } from './edit-phonelog.component';

describe('EditPhonelogComponent', () => {
  let component: EditPhonelogComponent;
  let fixture: ComponentFixture<EditPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
