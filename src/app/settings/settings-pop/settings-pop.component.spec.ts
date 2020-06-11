import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPopComponent } from './settings-pop.component';

describe('SettingsPopComponent', () => {
  let component: SettingsPopComponent;
  let fixture: ComponentFixture<SettingsPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
