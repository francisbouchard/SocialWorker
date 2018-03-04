
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatGridListModule,
  MatListModule,
  MatNativeDateModule,
  MatOptionModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule} from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule
  ]
})
export class MaterialsModule { }
