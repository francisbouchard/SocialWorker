import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';

import { AppComponent } from './app.component';
import { ActiveCasefilesComponent } from './components/active-casefiles/active-casefiles.component';
import { ActivityComponent } from './components/dashboard/activity/activity.component';
import { AddParticipantComponent } from './components/participants/add-participant/add-participant.component';
import { AddPhonelogComponent } from './components/phonelog/add-phonelog/add-phonelog.component';
import { AddResourceComponent } from './components/resources/add-resource/add-resource.component';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { CasefilesComponent } from './components/participants/participant-profile/casefiles/casefiles.component';
import { CaseModalComponent } from './components/modals/case-modal/case-modal.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentsComponent } from './components/participants/participant-profile/documents/documents.component';
import { EditParticipantComponent } from './components/participants/edit-participant/edit-participant.component';
import { EditPhonelogComponent } from './components/phonelog/edit-phonelog/edit-phonelog.component';
import { EditResourceComponent } from './components/resources/edit-resource/edit-resource.component';
import { EditWorkerModalComponent } from './components/modals/edit-worker-modal/edit-worker-modal.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NoteComponent } from './components/note/note.component';
import { NotesComponent } from './components/participants/participant-profile/notes/notes.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { ParticipantProfileComponent } from './components/participants/participant-profile/participant-profile.component';
import { PhonelogComponent } from './components/phonelog/phonelog.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TrashbinComponent } from './components/trashbin/trashbin.component';
import { UsersComponent } from './components/users/users.component';
import { ViewPhonelogComponent } from './components/phonelog/view-phonelog/view-phonelog.component';
import { ViewParticipantsComponent } from './components/participants/view-participants/view-participants.component';
import { ViewResourcesComponent } from './components/resources/view-resources/view-resources.component';
import { ViewUsersComponent } from './components/users/view-users/view-users.component';

import { AuthenticationService } from './services/authentication.service';
import { CasefileService } from './services/casefile.service';
import { MessageService } from './services/message.service';
import { ParticipantService } from './services/participant.service';
import { PhonelogService } from './services/phonelog.service';
import { ResourceService } from './services/resource.service';
import { UserService } from './services/user.service';

import { OrderByPipe } from './pipes/orderBy.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TaskService } from './services/task.service';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'activity',
        pathMatch: 'full'
      },
      {
        path: 'activity',
        component: ActivityComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'active-casefiles',
        component: ActiveCasefilesComponent
      },
      {
        path: 'phonelog',
        component: PhonelogComponent
      },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          {
            path: '',
            redirectTo: 'view-users',
            pathMatch: 'full'
          },
          {
            path: 'register-user',
            component: RegisterUserComponent
          },
          {
            path: 'view-users',
            component: ViewUsersComponent
          }
        ]
      },
      {
        path: 'reports',
        component: ReportsComponent
      },
      {
        path: 'trashbin',
        component: TrashbinComponent
      },
    ]
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
    ActiveCasefilesComponent,
    ActivityComponent,
    AddParticipantComponent,
    AddPhonelogComponent,
    AddResourceComponent,
    AlertModalComponent,
    CasefilesComponent,
    CaseModalComponent,
    DashboardComponent,
    DocumentComponent,
    DocumentsComponent,
    EditParticipantComponent,
    EditPhonelogComponent,
    EditResourceComponent,
    EditWorkerModalComponent,
    LoginComponent,
    MessagesComponent,
    NoteComponent,
    NotesComponent,
    ParticipantProfileComponent,
    ParticipantsComponent,
    PhonelogComponent,
    RegisterUserComponent,
    ReportsComponent,
    ResourcesComponent,
    TasksComponent,
    TrashbinComponent,
    UsersComponent,
    ViewParticipantsComponent,
    ViewPhonelogComponent,
    ViewResourcesComponent,
    ViewUsersComponent,
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
    EditWorkerModalComponent,
    DocumentComponent,
    NoteComponent
  ],
  providers: [
    ParticipantService,
    MessageService,
    ResourceService,
    CasefileService,
    UserService,
    AuthenticationService,
    PhonelogService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
