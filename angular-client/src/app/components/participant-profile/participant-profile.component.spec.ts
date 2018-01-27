import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantProfileComponent } from './participant-profile.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { MessageService } from '../../services/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { MockParticipantService } from '../../mocks/MockParticipantService';

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
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({_id: "frontendtest"}) } } }
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

  it("should display name of the user", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('testuser');
  });

  it("should display user's note and its attachd image", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-expansion-panel').textContent).toContain('Note for testing');
    expect(compiled.querySelector('img')).toBeTruthy();
  });

  

});
