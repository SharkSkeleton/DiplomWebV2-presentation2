import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelHeaderComponent } from './admin-panel-header.component';

describe('AdminPanelHeaderComponent', () => {
  let component: AdminPanelHeaderComponent;
  let fixture: ComponentFixture<AdminPanelHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
