import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { ListTasksViewComponent } from './views/list-tasks-view/list-tasks-view.component';
import { MaterialModule } from '../shared/material/material.module';
import { ComponentsModule } from '../shared/components/components.module';


@NgModule({
  declarations: [
    ListTasksViewComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    MaterialModule,
    ComponentsModule
  ]
})
export class TasksModule { }
