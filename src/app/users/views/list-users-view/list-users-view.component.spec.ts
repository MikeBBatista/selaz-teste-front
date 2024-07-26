import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersViewComponent } from './list-users-view.component';

describe('ListUsersViewComponent', () => {
  let component: ListUsersViewComponent;
  let fixture: ComponentFixture<ListUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListUsersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
