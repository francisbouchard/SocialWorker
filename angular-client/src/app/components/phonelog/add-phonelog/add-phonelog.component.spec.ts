import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhonelogComponent } from './add-phonelog.component';

describe('AddPhonelogComponent', () => {
  let component: AddPhonelogComponent;
  let fixture: ComponentFixture<AddPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhonelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
