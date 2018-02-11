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
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditResourceComponent } from './components/resources/edit-resource/edit-resource.component';
import { MessagesComponent } from './components/messages/messages.component';
import { AddParticipantComponent } from './components/participants/add-participant/add-participant.component';
import { NoteComponent } from './components/note/note.component';
import { ParticipantProfileComponent } from './components/participants/participant-profile/participant-profile.component';
import { ViewParticipantsComponent } from './components/participants/view-participants/view-participants.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { ViewResourcesComponent } from './components/resources/view-resources/view-resources.component';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationService } from './services/authentication.service';
import { ResourceService } from './services/resource.service';
import { CaseModalComponent } from './components/modals/case-modal/case-modal.component';
import { CasefileService } from './services/casefile.service';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { OrderByPipe } from './pipes/orderBy.pipe';
import { SearchPipe } from './pipes/search.pipe';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/participants',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'participants',
    component: ParticipantsComponent
  },
  {
    path: 'new-participant',
    component: AddParticipantComponent
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
    AddParticipantComponent,
    ParticipantProfileComponent,
    ParticipantsComponent,
    ViewParticipantsComponent,
    AlertModalComponent,
    LoginComponent,
    ResourcesComponent,
    AddResourceComponent,
    ViewResourcesComponent,
    CaseModalComponent,
    NoteComponent,
    RegisterUserComponent,
    OrderByPipe,
    SearchPipe
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
