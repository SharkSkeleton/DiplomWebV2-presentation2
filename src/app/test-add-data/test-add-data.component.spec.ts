import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAddDataComponent } from './test-add-data.component';

describe('TestAddDataComponent', () => {
  let component: TestAddDataComponent;
  let fixture: ComponentFixture<TestAddDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAddDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
