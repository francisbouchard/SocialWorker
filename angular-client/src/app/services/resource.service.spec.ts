import { TestBed, inject } from '@angular/core/testing';
import { ResourceService } from './resource.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './message.service';

describe('ResourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ResourceService, MessageService ]
    });
  });

  it('should be created', inject([ResourceService], (service: ResourceService) => {
    expect(service).toBeTruthy();
  }));
});
