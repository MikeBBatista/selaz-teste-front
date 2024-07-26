import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  // Apesar de ser uma aplicação pequena, resolvi utilizar lazy loading para demonstração do conhecimento
  { 
    path: '', 
    redirectTo: '/task-list', 
    pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'task-list',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
