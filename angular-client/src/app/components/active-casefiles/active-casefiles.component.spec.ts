import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCasefilesComponent } from './active-casefiles.component';

describe('ActiveCasefilesComponent', () => {
  let component: ActiveCasefilesComponent;
  let fixture: ComponentFixture<ActiveCasefilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveCasefilesComponent ]
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
