import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteComponent } from './note.component';
import { ParticipantService } from '../../services/participant.service';
import { MaterialsModule } from '../../modules/materials.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('NoteComponent', () => {
  let component: NoteComponent;
  let fixture: ComponentFixture<NoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ParticipantService, useValue: {} }, {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
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
