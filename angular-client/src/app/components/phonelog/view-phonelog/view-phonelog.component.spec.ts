import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPhonelogComponent } from './view-phonelog.component';

describe('ViewPhonelogComponent', () => {
  let component: ViewPhonelogComponent;
  let fixture: ComponentFixture<ViewPhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPhonelogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
