import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authentication.service';
import { MockAuthenticationService } from '../../mocks/MockAuthenticationService';
import { PhonelogComponent } from './phonelog.component';
import { AddPhonelogComponent } from './add-phonelog/add-phonelog.component';
import { ViewPhonelogComponent } from './view-phonelog/view-phonelog.component';
import { MaterialsModule } from '../../modules/materials.module';

describe('PhonelogComponent', () => {
  let component: PhonelogComponent;
  let fixture: ComponentFixture<PhonelogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonelogComponent, AddPhonelogComponent, ViewPhonelogComponent ],
      imports: [ MaterialsModule, RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
        { provide: Router, useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') } }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
