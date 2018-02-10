import { TestBed, inject } from '@angular/core/testing';
import { ParticipantService } from './participant.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

describe('ParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ParticipantService, MessageService ]
    });
  });

  it('should be created', inject([ParticipantService], (service: ParticipantService) => {
    expect(service).toBeTruthy();
  }));
});
