import { TestBed, inject } from '@angular/core/testing';

import { TaskService } from './task.service';
import { MessageService } from './message.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [TaskService, MessageService]
    });
  });

  it('should be created', inject([TaskService], (service: TaskService) => {
    expect(service).toBeTruthy();
  }));
});
