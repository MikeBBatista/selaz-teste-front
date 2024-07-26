import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MaterialModule } from '../material/material.module';
import { PageLoadingComponent } from './page-loading/page-loading.component';
import { InfoCardComponent } from './info-card/info-card.component';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    PageLoadingComponent,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent,
    PageLoadingComponent,
    InfoCardComponent
  ]
})
export class ComponentsModule { }
