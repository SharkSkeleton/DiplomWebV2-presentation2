import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAnswerComponent } from './add-user-answer.component';

describe('AddUserAnswerComponent', () => {
  let component: AddUserAnswerComponent;
  let fixture: ComponentFixture<AddUserAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
