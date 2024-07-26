import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../enviroments/environment'
import { listTasks } from './models/data-models';

@Injectable({
  providedIn: 'root'
})
export class appService {

  private apiUrl: string = `${environment.apiUrl}`;

  constructor(
    private httpClient: HttpClient,
  ) {}

  getTasks(page: number, status: string[], sortDirection: string): Observable<listTasks> {
    const statusParam = status.join(',').toLowerCase();
    let params = new HttpParams()
    .set('page', page.toString())
    .set('status',statusParam)
    .set('sort',sortDirection);
    
    return this.httpClient.get<listTasks>(`${this.apiUrl}/tasks`, {params}).pipe(
      catchError ((error: HttpErrorResponse) => {
        this.manageError(error);
        return throwError(() => new Error(this.manageError(error)))
      })
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }

  manageError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor: ${error.status}, ${error.message}`;
    }
    return errorMessage;
  }
}