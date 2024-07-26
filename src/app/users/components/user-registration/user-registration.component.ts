import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: any }
  ) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      admin: ['', Validators.required],
    }, { validators: [this.passwordMatchValidator] });
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.isEditing = true;
      this.registrationForm.patchValue(this.data.user);
    }
  }

  passwordMatchValidator(frm: AbstractControl) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value
      ? null : ({ mismatch: true });
  }

  onSubmit() {
    console.log(this.registrationForm);
    if (this.registrationForm.valid) {
      console.log('Form Submitted!', this.registrationForm.value);
      this.dialogRef.close(this.registrationForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}