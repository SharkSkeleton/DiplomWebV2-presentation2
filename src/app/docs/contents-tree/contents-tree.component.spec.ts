import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsTreeComponent } from './contents-tree.component';

describe('ContentsTreeComponent', () => {
  let component: ContentsTreeComponent;
  let fixture: ComponentFixture<ContentsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
