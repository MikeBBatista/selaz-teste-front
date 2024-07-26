import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { appService } from '../../../app.service';
import { Task } from '../../../models/data-models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-tasks-view',
  templateUrl: './list-tasks-view.component.html',
  styleUrl: './list-tasks-view.component.scss'
})
export class ListTasksViewComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public page: number = 1;
  public data: Task[] = [];
  public sortDirection: string = 'asc';
  public totalItems: number = 0;
  taskStatus = new FormControl('');
  public filterStatus: string[] = [''];
  public onLoad: boolean = true;
  taskStatusList: string[] = ['PENDENTE', 'EM ANDAMENTO', 'CONCLUÍDA'];
  public errorMessage!: string;
  
  constructor(
    public dialog: MatDialog,
    private projectService: appService, 
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTasks(['']);
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
      console.log(`Task with ID ${taskId} deleted successfully.`);
      this.data = [];
      this.getTasks(this.filterStatus);
    });
  }

  getTasks(status: string[]) {
    this.onLoad = true;
    this.subscriptions
    .push(
      this.projectService.getTasks(this.page, status, this.sortDirection).subscribe( {
        next: (res) => {
          if(this.page === 0) {
            this.data = res.tasks;
          } else {
            this.data = [...this.data, ...res.tasks];
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filterByStatus(event: any) {
    this.filterStatus = event.value ? event.value : event;
    this.data = [];
    this.getTasks(this.filterStatus);
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
        this.getTasks(this.filterStatus);
      }
    }
  }
}
