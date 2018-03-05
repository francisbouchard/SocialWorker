import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotesComponent } from './notes.component';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MockAuthenticationService } from '../../../../mocks/MockAuthenticationService';
import { ParticipantService } from '../../../../services/participant.service';
import { MockParticipantService } from '../../../../mocks/MockParticipantService';


describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ParticipantService, useClass: MockParticipantService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;

    const expectedNote = [{
        date : '2018-02-22T23:01:14.000Z',
        _id : '5a8f4bef5aa5bd31eb7e12e6',
        text : 'Meeting',
        attachment : 'Proposal 13-dec-2017.pdf',
        createdAt : '2018-02-22T23:02:09.105Z',
        updatedAt : '2018-02-22T23:02:09.105Z'
    }];

    component.orderedNotes = expectedNote;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
