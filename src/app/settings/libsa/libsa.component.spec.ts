import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibsaComponent } from './libsa.component';

describe('LibsaComponent', () => {
  let component: LibsaComponent;
  let fixture: ComponentFixture<LibsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
