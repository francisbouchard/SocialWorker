import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';
import {MatCardModule} from '@angular/material';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { AppComponent } from './app.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {ProfilesService} from '../providers/profilesService'
import { Http,HttpModule } from '@angular/http';

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
    path: 'create-profile',
    component: CreateProfileComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    CreateProfileComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatCardModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [ProfilesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
