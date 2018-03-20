import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../../modules/materials.module';
import { ParticipantService } from '../../../services/participant.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MockParticipantService } from '../../../services/mocks/MockParticipantService';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../services/mocks/MockAuthenticationService';
import { Router } from '@angular/router';
import { NoteModalComponent } from './note-modal.component';

describe('NoteComponent', () => {
  let component: NoteModalComponent;
  let fixture: ComponentFixture<NoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteModalComponent ],
      imports: [ MaterialsModule, FormsModule ],
      providers: [
        { provide: ParticipantService, useClass: MockParticipantService },
        {provide: MatDialogRef, useValue: {} },
        {provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
