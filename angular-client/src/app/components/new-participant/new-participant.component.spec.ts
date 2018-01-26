import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialsModule } from '../../modules/materials.module';
import { NewParticipantComponent } from './new-participant.component';
import { ParticipantService } from '../../services/participant.service';
import { MatDialog } from '@angular/material';

describe('NewParticipantComponent', () => {
  let component: NewParticipantComponent;
  let fixture: ComponentFixture<NewParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParticipantComponent ],
      imports: [ MaterialsModule ],
      providers: [ { provide: ParticipantService, useValue: {} }, MatDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
