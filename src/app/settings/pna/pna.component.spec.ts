import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnaComponent } from './pna.component';

describe('PnaComponent', () => {
  let component: PnaComponent;
  let fixture: ComponentFixture<PnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
