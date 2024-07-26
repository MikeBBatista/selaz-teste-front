import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ListUsersViewComponent } from './views/list-users-view/list-users-view.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ComponentsModule } from '../shared/components/components.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    UsersComponent,
    ListUsersViewComponent,
    UserRegistrationComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class UsersModule { }
