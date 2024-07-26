import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTasksViewComponent } from './views/list-tasks-view/list-tasks-view.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ListTasksViewComponent,
    canActivate: [AuthGuard], 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
