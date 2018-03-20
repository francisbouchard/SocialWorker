import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ParticipantProfileComponent } from './participant-profile.component';
import { CasefilesComponent } from '../../casefiles/casefiles.component';
import { NotesComponent } from '../../notes/notes.component';
import { DocumentsComponent } from '../../documents/documents.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ParticipantService } from '../../../services/participant.service';
import { MessageService } from '../../../services/message.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { MockParticipantService } from '../../../mocks/MockParticipantService';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { CasefileService } from '../../../services/casefile.service';
import { MockCasefileService } from '../../../mocks/MockCasefileService';



describe('ParticipantProfileComponent', () => {
  let component: ParticipantProfileComponent;
  let fixture: ComponentFixture<ParticipantProfileComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule, RouterTestingModule ],
      declarations: [ ParticipantProfileComponent, CasefilesComponent, NotesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [
        MessageService,
        { provide: ParticipantService, useClass: MockParticipantService},
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CasefileService, useClass: MockCasefileService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({_id: 'frontendtest'}) } } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

  it('should display user\'s casefile', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-expansion-panel')[0].textContent).toContain('In progress');
  });

  it('should display user\'s note and its attached image', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-expansion-panel')[1].textContent).toContain('Note for testing');
    // expect(compiled.querySelector('img')).toBeTruthy(); // TODO when image is retrieved from server issue #68, #69
  });

  it('should refresh notes displayed when one gets deleted', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const deleteButton = compiled.querySelector('#deleteNoteBtn');
    deleteButton.click();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('div').textContent).toContain('No notes to display.');
  }));

  it('should refresh casefiles displayed when one gets deleted', fakeAsync(() => {
    const compiled = fixture.debugElement.nativeElement;
    const deleteCasefileButton = compiled.querySelector('#deleteCaseBtn');
    deleteCasefileButton.click();
    tick();
    fixture.detectChanges();
    expect(compiled.querySelector('div').textContent).toContain('No cases to display.');
  }));

});
