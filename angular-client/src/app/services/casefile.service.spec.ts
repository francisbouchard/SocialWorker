import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CasefileService } from './casefile.service';
import { MessageService } from './message.service';

describe('CasefileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [CasefileService, MessageService]
    });
  });

  it('should be created', inject([CasefileService], (service: CasefileService) => {
    expect(service).toBeTruthy();
  }));
});
