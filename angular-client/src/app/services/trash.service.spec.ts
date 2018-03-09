import { TestBed, inject } from '@angular/core/testing';

import { TrashService } from './trash.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

describe('TrashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ TrashService, MessageService ]
    });
  });

  it('should be created', inject([TrashService], (service: TrashService) => {
    expect(service).toBeTruthy();
  }));
});
