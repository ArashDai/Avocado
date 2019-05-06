import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionManagerComponent } from './option-manager.component';

describe('OptionManagerComponent', () => {
  let component: OptionManagerComponent;
  let fixture: ComponentFixture<OptionManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
