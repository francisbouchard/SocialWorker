import { TestBed, inject } from '@angular/core/testing';
import { PhonelogService } from './phonelog.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

describe('ParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ PhonelogService, MessageService ]
    });
  });

  it('should be created', inject([PhonelogService], (service: PhonelogService) => {
    expect(service).toBeTruthy();
  }));
});
