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
  @Output() editTask: EventEmitter<any> = new EventEmitter();
  @Input() user!: User;
  @Input() admin: boolean = false;
  @Input() userId!: number;
  @Output() deleteUser: EventEmitter<any> = new EventEmitter();
  @Output() editUser: EventEmitter<any> = new EventEmitter(); 
 
  getFormattedStatus(): string {
     return this.task.status.toUpperCase();
   }
 
   formatISODate(isoDateString: Date): string {
    const date = new Date(isoDateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = date.getUTCFullYear();
    
    return `${day}/${month}/${year}`;
   }

   editTaskInfo(task: Task) {
    this.editTask.emit(task);
   }

   editUserInfo(user: User) {
    this.editUser.emit(user);
   }
 
   deleteTaskId(taskId: number) {
    console.log(this.task)
     this.deleteTask.emit(taskId);
   }

   deleteUserId(userId: number) {
    this.deleteUser.emit(userId);
  }

  checkPermission(userId: number) {
    if (this.userId == userId) {
      return false
    } else {
      return this.admin
    }
  }
}
