import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantProfileComponent } from './participant-profile.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ActivatedRoute } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { MessageService } from '../../services/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

class MockParticipantService {

}

describe('ParticipantProfileComponent', () => {
  let component: ParticipantProfileComponent;
  let fixture: ComponentFixture<ParticipantProfileComponent>;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, RouterTestingModule ],
      declarations: [ ParticipantProfileComponent ],
      providers: [
        MessageService,
        { provide: ParticipantService, useClass: MockParticipantService}, 
        { provide: ActivatedRoute, useValue: {} }
      ]
    });
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ParticipantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
