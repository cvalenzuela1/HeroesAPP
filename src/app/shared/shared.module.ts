import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  exports: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class SharedModule { }
