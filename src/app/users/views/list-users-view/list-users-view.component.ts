import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../../components/user-registration/user-registration.component';
import { User } from '../../../models/data-models';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Subscription, throwError } from 'rxjs';
import { appService } from '../../../app.service';

@Component({
  selector: 'app-list-users-view',
  templateUrl: './list-users-view.component.html',
  styleUrl: './list-users-view.component.scss'
})
export class ListUsersViewComponent implements OnInit, OnDestroy{
  public data: User[] = [];
  public errorMessage!: string;
  public sucessMessage!: string;
  public page: number = 1;
  public totalItems: number = 0;
  public onLoad: boolean = false;
  private subscriptions: Subscription[] = [];
  public storageUser: any;
  public permission: boolean = false;

  constructor(
    public registraitonDialog: MatDialog, 
    public confirmDialog: MatDialog, 
    private projectService: appService
  ) {}

  ngOnInit() {
    let localUser = localStorage.getItem('user')
    console.log(localStorage.getItem('user'));
    if (localUser !== null) {
      this.storageUser = JSON.parse(localUser);
      this.permission = this.storageUser.admin === true ? true : false;
      console.log(this.permission);
    }
    this.checkPermission();
  }

  checkPermission() {
    if (this.storageUser.admin === false) {
      this.getUserById(this.storageUser.id);
    } else {
      this.getUsers();
    }
  }

  getUserById(userId: number) {
    this.onLoad = true;
    this.subscriptions
    .push(
      this.projectService.getUserById(userId).subscribe( {
        next: (res) => {
          this.data = res.users;
          this.totalItems = 1;
          this.onLoad = false;
        },
        error: () => {
          this.errorMessage = 'Ocorreu um erro ao carregar os usuários. Por favor, contate a equipe de suporte.';
          this.onLoad = false;
          return throwError(() => new Error(this.errorMessage))
        }
      })
    );
  }

  createUser(user: User) {
    this.projectService.createUser(user).subscribe({
      next: () => {
        this.sucessMessage = 'Usuário criado com sucesso!';
        this.getUsers();
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao criar o usuário. Por favor, contate a equipe de suporte.';
        this.onLoad = false;
        return throwError(() => new Error(this.errorMessage))
      }
    })
  }

  updateUser(user: User, userId: number) {
    this.projectService.updateUser(userId, user).subscribe({
      next: () => {
        this.sucessMessage = 'Informações de usuário atualizadas com sucesso!';
        this.checkPermission();
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao atualizar o usuário. Por favor, contate a equipe de suporte.';
        this.onLoad = false;
        return throwError(() => new Error(this.errorMessage))
      }
    })
  }

  deleteUser(userId: number): void {
    this.projectService.deleteUser(userId).subscribe({
      next: () => {
        this.sucessMessage = 'Usuário excluído com sucesso!'
        this.page = 1;
        this.getUsers();
      },
      error: () => {
        this.errorMessage = 'Ocorreu um erro ao deletar o usuário. Por favor, contate a equipe de suporte.';
        this.onLoad = false;
        return throwError(() => new Error(this.errorMessage))
      }
    });
  }

  getUsers() {
    this.onLoad = true;
    this.subscriptions
    .push(
      this.projectService.getUsers(this.page).subscribe( {
        next: (res) => {
          if(this.page === 1) {
            this.data = res.users;
          } else {
            this.data = [...this.data, ...res.users];
          }
          this.totalItems = res.total;
          this.onLoad = false;
        },
        error: () => {
          this.errorMessage = 'Ocorreu um erro ao carregar os usuários. Por favor, contate a equipe de suporte.';
          this.onLoad = false;
          return throwError(() => new Error(this.errorMessage))
        }
      })
    );
  }

  openRegistrationDialog(user?: User): void {
    console.log(this.permission);
    const dialogRef = this.registraitonDialog.open(UserRegistrationComponent, {
      width: '348px',
      data: { user: user ? { ...user, confirmPassword: ''} : null, permission: this.permission }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user) {
          this.updateUser(result, user.id);
        } else {
          this.createUser(result)
        }
      }
    });
  }

  openConfirmDialog(userId: number): void {
    const dialogRef = this.confirmDialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Você tem certeza que deseja excluir este usuário?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(userId);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
