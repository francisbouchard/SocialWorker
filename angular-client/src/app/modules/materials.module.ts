
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { 
  MatButtonModule, 
  MatCardModule,
  MatDialogModule,
  MatIconModule, 
  MatInputModule, 
  MatRadioModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,  
  MatOptionModule } from '@angular/material';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    CdkTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialsModule { }