import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
    path: 'new-participant',
    component: NewParticipantComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewParticipantComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ParticipantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }