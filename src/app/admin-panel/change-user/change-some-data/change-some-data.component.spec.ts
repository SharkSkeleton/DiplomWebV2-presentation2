import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSomeDataComponent } from './change-some-data.component';

describe('ChangeSomeDataComponent', () => {
  let component: ChangeSomeDataComponent;
  let fixture: ComponentFixture<ChangeSomeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSomeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSomeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
