import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DocumentsComponent } from './documents.component';
import { ParticipantService } from '../../../../services/participant.service';
import { MockParticipantService } from '../../../../mocks/MockParticipantService';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MockAuthenticationService } from '../../../../mocks/MockAuthenticationService';


describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: ParticipantService, useClass: MockParticipantService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;

    const expectedDocuments = [
      {
          date : '2018-02-21T19:23:04.000Z',
          attachment : [
              'La saison des infiltrations - La Presse .pdf'
          ],
          type : 'Newspaper article',
          _id : '5a8dc753136eb42b0e9a65f7',
          createdAt : '2018-02-21T19:24:03.316Z',
          updatedAt : '2018-02-21T19:24:03.316Z'
      }
  ];

  component.orderedDocuments = expectedDocuments;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
