import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewParticipantComponent } from './components/new-participant/new-participant.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { ParticipantProfileComponent } from './components/participant-profile/participant-profile.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profiles',
    component: ProfilesComponent
  },
  {
    path: 'new-participant',
    component: NewParticipantComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'participant-profile/:_id',
    component: ParticipantProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessagesComponent,
    NewParticipantComponent,
    ProfilesComponent,
    AlertModalComponent,
    LoginComponent,
    ParticipantProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  entryComponents: [ AlertModalComponent ],
  providers: [
    ParticipantService,
    MessageService,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
