import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashComponent } from './trash.component';
import { MaterialsModule } from '../../../modules/materials.module';
import { AuthenticationService } from '../../../services/authentication.service';
import { MockAuthenticationService } from '../../../mocks/MockAuthenticationService';
import { TrashService } from '../../../services/trash.service';
import { MockTrashService } from '../../../mocks/MockTrashService';
import { OrderByPipe } from '../../../pipes/orderBy.pipe';
import { MatDialog } from '@angular/material';

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashComponent, OrderByPipe ],
      imports: [ MaterialsModule ],
      providers: [
        MatDialog,
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: TrashService, useClass: MockTrashService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
