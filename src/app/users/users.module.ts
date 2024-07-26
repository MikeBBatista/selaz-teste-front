import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUsersViewComponent } from './views/list-users-view/list-users-view.component';


@NgModule({
  declarations: [
    UsersComponent,
    ListUsersViewComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
