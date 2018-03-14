import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialsModule } from './modules/materials.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './services/authentication.service';
import { MockAuthenticationService } from './mocks/MockAuthenticationService';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialsModule,
        RouterTestingModule ],
      declarations: [
        AppComponent
      ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } } ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'SocialWorker'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('SocialWorker');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('SocialWorker');
  }));
});
