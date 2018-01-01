import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';
import {MatCardModule} from '@angular/material';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ProfilesService} from '../providers/profilesService'
import { Http, HttpModule } from '@angular/http';
import { NewParticipantComponent } from './components/new-participant/new-participant.component';
import { ParticipantService } from './services/participant.service';

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
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    DashboardComponent,
    NewParticipantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [
    ProfilesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
