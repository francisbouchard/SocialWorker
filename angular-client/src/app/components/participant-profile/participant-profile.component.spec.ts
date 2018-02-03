import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ParticipantProfileComponent } from './participant-profile.component';
import { MaterialsModule } from '../../modules/materials.module';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ParticipantService } from '../../services/participant.service';
import { MessageService } from '../../services/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';

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
        { provide: AuthenticationService, useClass: MockAuthenticationService }, 
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({_id: 'frontendtest'}) } } }
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

  it('should display name of the user', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('testuser');
  });

  it('should display user\'s note and its attached image', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-expansion-panel').textContent).toContain('Note for testing');
    expect(compiled.querySelector('img')).toBeTruthy();
  });

  it('should refresh resources displayed when one gets deleted', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const deleteButton = compiled.querySelector('#deleteBtn');
    deleteButton.click();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('div').textContent).toContain('No notes to display.');
  }));

});
