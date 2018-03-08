import { TestBed, inject } from '@angular/core/testing';

import { TrashService } from './trash.service';

describe('TrashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrashService]
    });
  });

  it('should be created', inject([TrashService], (service: TrashService) => {
    expect(service).toBeTruthy();
  }));
});
