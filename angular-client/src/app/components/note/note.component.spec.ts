import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../modules/materials.module';
import { ParticipantService } from '../../services/participant.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockParticipantService } from '../../mocks/MockParticipantService';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { Router } from '@angular/router';
import { NoteComponent } from './note.component';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoteComponent],
      imports: [MaterialsModule, FormsModule],
      providers: [
        { provide: ParticipantService, useClass: MockParticipantService },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy("navigateByUrl") } },
        { provide: ParticipantService, useClass: MockParticipantService },
        MatDialog
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
