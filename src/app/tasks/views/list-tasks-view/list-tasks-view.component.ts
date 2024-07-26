import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { appService } from '../../../app.service';
import { Task, User } from '../../../models/data-models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { TaskRegistrationComponent } from '../../components/task-registration/task-registration.component';

@Component({
  selector: 'app-list-tasks-view',
  templateUrl: './list-tasks-view.component.html',
  styleUrl: './list-tasks-view.component.scss'
})
export class ListTasksViewComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public page: number = 1;
  public data: Task[] = [];
  public sortDirection: string = 'asc';
  public totalItems: number = 0;
  taskStatus = new FormControl('');
  public filterStatus: string[] = [''];
  public filterUser: string[] = [''];
  public onLoad: boolean = true;
  taskStatusList: string[] = ['PENDENTE', 'EM ANDAMENTO', 'CONCLUÍDA'];
  public errorMessage!: string;
  public sucessMessage!: string;
  public users: User[] = []
  public usersMap: { [key: string]: string } = {};
  
  constructor(
    public dialog: MatDialog,
    public registraitonDialog: MatDialog,
    private projectService: appService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getTasks();
  }

  getUsers() {
    this.projectService.getAllusers().subscribe({
      next: (res) => {
        this.users = res;
        this.usersMap = res.reduce((map, user) => {
          map[user.id] = user.username; // Mapeia ID para nome
          return map;
        }, {} as { [key: string]: string })
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao carregar os usuários. Por favor, contate a equipe de suporte.';
        return throwError(() => new Error(this.errorMessage))
      }
    })
  }

  openRegistrationDialog(task?: Task): void {
    const dialogRef = this.registraitonDialog.open(TaskRegistrationComponent, {
      width: '348px',
      data: { task: task ? task : null, users: this.users }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          this.updateTask(result, task.id)
        } else {
          this.createTask(result);
        }
      }
    });
  }

  createTask(task: Task) {
    task.createDate = new Date();
    this.projectService.createTask(task).subscribe({
      next: () => {
        this.sucessMessage = 'Tarefa criada com sucesso!';
        this.page = 1;
        this.getTasks();
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao criar a tarefa. Por favor, contate a equipe de suporte.';
        this.onLoad = false;
        return throwError(() => new Error(this.errorMessage))
      }
    })
  }

  updateTask(task: Task, userId: number) {
    this.projectService.updateTask(userId, task).subscribe({
      next: () => {
        this.sucessMessage = 'Informações da tarefa atualizadas com sucesso!';
        this.page = 1;
        this.getTasks();
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao atualizar a tarefa. Por favor, contate a equipe de suporte.';
        this.onLoad = false;
        return throwError(() => new Error(this.errorMessage))
      }
    })
  }
  
  openConfirmDialog(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Você tem certeza que deseja excluir esta tarefa?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTask(taskId);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.projectService.deleteTask(taskId).subscribe(() => {
      this.page = 1;
      this.getTasks();
      this.sucessMessage = 'Tarefa excluída com sucesso!'
    });
  }

  getTasks() {
    this.onLoad = true;
    this.subscriptions
    .push(
      this.projectService.getTasks(this.page, this.filterStatus, this.sortDirection, this.filterUser).subscribe( {
        next: (res) => {
          let tasks = res.tasks.map(task => ({
            ...task,
            responsibleName: this.usersMap[task.responsible]
          }));
          if(this.page === 1) {
            this.data = tasks;
          } else {
            this.data = [...this.data, ...tasks];
          }
          this.totalItems = res.total;
          this.onLoad = false;
        },
        error: () => {
          this.errorMessage = 'Ocorreu um erro ao carregar as tarefas. Por favor, contate a equipe de suporte.';
          this.onLoad = false;
          return throwError(() => new Error(this.errorMessage))
        }
      })
    );
  }

  filterByStatus(event: any) {
    this.filterStatus = event.value ? event.value : event;
    this.page = 1;
    this.getTasks();
  }

  filterByUser(event: any) {
    this.filterUser = event.value ? event.value : event;
    this.page = 1;
    this.getTasks();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition + windowHeight) / documentHeight;
    if (scrollPercentage >= 0.99) {
      if (!this.onLoad && this.data.length !== this.totalItems) {
        this.page += 1;
        this.getTasks();
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
