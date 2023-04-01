import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';




@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  exports: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
