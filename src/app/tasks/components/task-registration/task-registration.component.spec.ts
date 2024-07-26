import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRegistrationComponent } from './task-registration.component';

describe('TaskRegistrationComponent', () => {
  let component: TaskRegistrationComponent;
  let fixture: ComponentFixture<TaskRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
