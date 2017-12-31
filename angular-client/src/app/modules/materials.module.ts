
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';
import { 
  MatButtonModule, 
  MatCardModule,
  MatIconModule, 
  MatInputModule, 
  MatToolbarModule,  
  MatSelectModule,
  MatOptionModule } from '@angular/material';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    CdkTableModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    MatOptionModule
  ]
})
export class MaterialsModule { }