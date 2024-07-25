import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTasksViewComponent } from './list-tasks-view.component';

describe('ListTasksViewComponent', () => {
  let component: ListTasksViewComponent;
  let fixture: ComponentFixture<ListTasksViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListTasksViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTasksViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
