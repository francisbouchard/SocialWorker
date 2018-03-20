import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialsModule } from './modules/materials.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from './services/authentication.service';
import { MockAuthenticationService } from './services/mocks/MockAuthenticationService';
import { Router } from '@angular/router';
import { MessageService } from './services/message.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialsModule, RouterTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        MessageService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled).toBeTruthy();
  });

  it(`should have as title 'SocialWorker'`, () => {
    const compiled = fixture.debugElement.componentInstance;
    expect(compiled.title).toEqual('SocialWorker');
  });

});
