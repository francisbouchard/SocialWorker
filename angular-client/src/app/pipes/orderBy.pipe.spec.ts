import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Pipe, PipeTransform} from '@angular/core';
import { OrderByPipe } from './orderBy.pipe';


describe('orderBy', () => {
    let component: OrderByPipe;
    let fixture: ComponentFixture<OrderByPipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ Pipe ],
      providers: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderByPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
