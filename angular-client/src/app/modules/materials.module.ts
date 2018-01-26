
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';
import { 
  MatButtonModule, 
  MatCardModule,
  MatDialogModule,
  MatIconModule, 
  MatInputModule, 
  MatTabsModule,
  MatToolbarModule,  
  MatSelectModule,
  MatOptionModule, 
  MatListModule,
  MatGridListModule} from '@angular/material';
import { FormsModule } from '@angular/forms';


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
    MatTabsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatGridListModule,
    FormsModule
  ]
})
export class MaterialsModule { }