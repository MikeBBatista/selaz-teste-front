import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../models/data-models';

@Component({
  selector: 'app-task-registration',
  templateUrl: './task-registration.component.html',
  styleUrl: './task-registration.component.scss'
})
export class TaskRegistrationComponent {
  registrationForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: any, users: User[] }
  ) {
    this.registrationForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      status: ['', Validators.required],
      responsible: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.isEditing = true;
      this.registrationForm.patchValue(this.data.task);
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.dialogRef.close(this.registrationForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
