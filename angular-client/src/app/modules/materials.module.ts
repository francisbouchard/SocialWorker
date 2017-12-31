
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
    MatTableModule, 
    MatGridListModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatToolbarModule, 
    MatChipsModule, 
    MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkTableModule} from '@angular/cdk/table';


@NgModule({
  exports: [
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatTableModule,
    CdkTableModule
  ]
})
export class MaterialsModule { }