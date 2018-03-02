import { TestBed, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ UserService, MessageService ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
