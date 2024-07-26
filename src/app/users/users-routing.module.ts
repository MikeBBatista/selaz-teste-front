import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { ListUsersViewComponent } from './views/list-users-view/list-users-view.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
    { 
      path: '', 
      component: ListUsersViewComponent,
      canActivate: [AuthGuard],
    },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
