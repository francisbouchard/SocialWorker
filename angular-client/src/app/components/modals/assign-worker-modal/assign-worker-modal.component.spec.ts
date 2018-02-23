import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignWorkerModalComponent } from './assign-worker-modal.component';

describe('AssignWorkerModalComponent', () => {
  let component: AssignWorkerModalComponent;
  let fixture: ComponentFixture<AssignWorkerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignWorkerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignWorkerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
