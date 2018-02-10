import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';
import { AppComponent } from './app.component';
import { AddResourceComponent } from './components/resources/add-resource/add-resource.component';
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditResourceComponent } from './components/resources/edit-resource/edit-resource.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewParticipantComponent } from './components/new-participant/new-participant.component';
import { NoteComponent } from './components/note/note.component';
import { ParticipantProfileComponent } from './components/participant-profile/participant-profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ViewResourcesComponent } from './components/resources/view-resources/view-resources.component';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { ResourceService } from './services/resource.service';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { CasefileService } from './services/casefile.service';
import { RegisterUserComponent } from './components/register-user/register-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/profiles',
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
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'resources',
    component: ResourcesComponent
  },
  {
    path: 'participant-profile/:_id',
    component: ParticipantProfileComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddResourceComponent,
    AlertModalComponent,
    DashboardComponent,
    EditResourceComponent,
    MessagesComponent,
    NewParticipantComponent,
    ParticipantProfileComponent,
    ProfilesComponent,
    AlertModalComponent,
    LoginComponent,
    ParticipantProfileComponent,
    ResourcesComponent,
    AddResourceComponent,
    ViewResourcesComponent,
    ParticipantProfileComponent,
    CaseModalComponent,
    NoteComponent,
    RegisterUserComponent
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
  entryComponents: [
    AlertModalComponent,
    CaseModalComponent,
    NoteComponent
  ],
  providers: [
    ParticipantService,
    MessageService,
    ResourceService,
    CasefileService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
