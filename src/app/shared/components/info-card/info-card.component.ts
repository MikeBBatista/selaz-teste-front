import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, User } from '../../../models/data-models';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() task!: Task;
  @Output() deleteTask: EventEmitter<any> = new EventEmitter();
  @Input() user!: User;
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
 
  deleteUserID(userId: number) {
     this.deleteUser.emit(userId);
   }
 
 
  getFormattedStatus(): string {
     return this.task.status.toUpperCase();
   }
 
   formatISODate(isoDateString: Date): string {
     const date = new Date(isoDateString);
     const day = date.getUTCDate().toString().padStart(2, '0');
     const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
     const year = date.getUTCFullYear();
   
     return `${day}/${month}/${year}`;
   }
 
   deleteTaskID(taskId: number) {
     this.deleteTask.emit(taskId);
   }
}
