import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { MaterialsModule } from '../../modules/materials.module';
import { TaskService } from '../../services/task.service';
import { MockTaskService } from '../../mocks/MockTaskService';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: TaskService, useClass: MockTaskService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
