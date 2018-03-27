import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashbinComponent } from './trashbin.component';
import { MaterialsModule } from '../../modules/materials.module';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { TrashService } from '../../services/trash.service';
import { MockTrashService } from '../../mocks/MockTrashService';
import { OrderByPipe } from '../../pipes/orderBy.pipe';
import { MatDialog } from '@angular/material';


describe('TrashbinComponent', () => {
  let component: TrashbinComponent;
  let fixture: ComponentFixture<TrashbinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashbinComponent, OrderByPipe ],
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
    fixture = TestBed.createComponent(TrashbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the appropriate deleted records', () => { // as returned by MockTrashService
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('p')[0].textContent).toContain('Resource:');
  });

  it('should contain restore and delete buttons', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-icon')[0].textContent).toContain('unarchive');
    expect(compiled.querySelectorAll('mat-icon')[1].textContent).toContain('delete_forever');
  });
});
