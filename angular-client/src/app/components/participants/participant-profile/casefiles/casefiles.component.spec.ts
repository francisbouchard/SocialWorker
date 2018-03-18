import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CasefilesComponent } from './casefiles.component';
import { MaterialsModule } from '../../../../modules/materials.module';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { AuthenticationService } from '../../../../services/authentication.service';
import { MockAuthenticationService } from '../../../../mocks/MockAuthenticationService';
import { CasefileService } from '../../../../services/casefile.service';
import { MockCasefileService } from '../../../../mocks/MockCasefileService';

describe('CasefilesComponent', () => {
  let component: CasefilesComponent;
  let fixture: ComponentFixture<CasefilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsModule, RouterTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [CasefilesComponent],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: CasefileService, useClass: MockCasefileService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ _id: 'frontendtest' }) } } }
      ]
    })
      .compileComponents();
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(CasefilesComponent);
    component = fixture.componentInstance;

    const expectedCase = [{
      '_id': '5a6df920087c7d3fc9dddfe9',
      'contactedResources': [
        {
          '_id': '5a8466e2ae933b1fe1714eea',
          'dateContacted': '2018-02-14T22:57:22.651Z',
          'note': 'Does not take pets',
          'resource': {
            'constraints': [],
            'deleted': false,
            'kind': 'Housing',
            '_id': '5a6cac2bdf03f80ede3f5c3e',
            'name': 'Housing Facility 4 Name',
            'email': 'housing4@resource.com',
            'term': '5 weeks',
            'createdAt': '2018-01-27T16:43:26.756Z',
            'updatedAt': '2018-01-27T16:43:26.756Z',
            '__v': 0
          },
          'isContacted': false
        }
      ],
      'createdAt': '2018-01-28T16:24:00.297Z',
      'notes': [
        'Needs urgent housing'
      ],
      'date': '2018-01-28T16:24:00.286Z',
      'deleted': false,
      'participant': 'frontendtest',
      'selectedResource': null,
      'status': 'In progress',
      'type': 'Housing',
      'updatedAt': '2018-01-28T16:24:00.297Z',
      'urgency': 'Urgent',
      '__v': 0
    }];

    component.orderedCases = expectedCase;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
