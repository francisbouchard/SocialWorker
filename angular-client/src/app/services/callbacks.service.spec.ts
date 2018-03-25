import { TestBed, inject } from '@angular/core/testing';

import { CallbacksService } from './callbacks.service';

describe('CallbacksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CallbacksService]
    });
  });

  it('should be created', inject([CallbacksService], (service: CallbacksService) => {
    expect(service).toBeTruthy();
  }));
});
