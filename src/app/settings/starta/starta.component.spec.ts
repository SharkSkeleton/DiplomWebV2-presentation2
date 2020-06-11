import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartaComponent } from './starta.component';

describe('StartaComponent', () => {
  let component: StartaComponent;
  let fixture: ComponentFixture<StartaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
