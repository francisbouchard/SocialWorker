import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonelogComponent } from './phonelog.component';

describe('PhonelogComponent', () => {
  let component: PhonelogComponent;
  let fixture: ComponentFixture<PhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
