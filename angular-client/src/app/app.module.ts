import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule  } from '@angular/material';
  


const appRoutes: Routes = [
  {
    path: 'profiles',
    component: ProfilesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent
  ],
  imports: [
    BrowserModule,
     RouterModule.forRoot(appRoutes),
     MatCardModule,
     MatFormFieldModule,
     MatInputModule,
     BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
