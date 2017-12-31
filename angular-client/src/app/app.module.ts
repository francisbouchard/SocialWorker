import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './modules/materials.module';


import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NewParticipantComponent } from './components/new-participant/new-participant.component';

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
    FormsModule,
    MaterialsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }