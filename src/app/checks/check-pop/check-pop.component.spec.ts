import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPopComponent } from './check-pop.component';

describe('CheckPopComponent', () => {
  let component: CheckPopComponent;
  let fixture: ComponentFixture<CheckPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
