import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParticipantComponent } from './edit-participant.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { ParticipantService } from '../../../services/participant.service';
import { MockParticipantService } from '../../../mocks/MockParticipantService';

describe('EditParticipantComponent', () => {
  let component: EditParticipantComponent;
  let fixture: ComponentFixture<EditParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditParticipantComponent],
      imports: [MaterialsModule],
      providers: [{ provide: ParticipantService, useClass: MockParticipantService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParticipantComponent);
    component = fixture.componentInstance;
    component.participant = {
      '_id': 'sally123',
      'name': 'Sally',
      'pronouns': 'they/them',
      'address': '123 Wilson',
      'telephone': '(514) 456-1231',
      'email': 'noemail@service.com',
      'socialmedia': { 'service': 'NoSocial', 'username': 'username' },
      'socialworkers': [
        {
          'tokens': [],
          'role': 'admin',
          '_id': '5a6ca05f54297a0c500cbd41',
          'name': 'James',
          'email': 'james@astteq.org',
          'password': '$2a$10$jnu1d5jGRaMXNXtt6l/eW.xW/XpyoZd4sdibumj8yvihTsvYH16mC',
          'createdAt': '2018-01-27T15:53:03.674Z',
          'updatedAt': '2018-01-27T15:53:03.674Z',
          '__v': 0
        }
      ],
      'notes': [{}],
      'documents': [{}]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
