import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasefilesComponent } from './casefiles.component';

describe('CasefilesComponent', () => {
  let component: CasefilesComponent;
  let fixture: ComponentFixture<CasefilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasefilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
