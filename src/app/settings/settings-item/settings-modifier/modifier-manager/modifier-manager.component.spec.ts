import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierManagerComponent } from './modifier-manager.component';

describe('ModifierManagerComponent', () => {
  let component: ModifierManagerComponent;
  let fixture: ComponentFixture<ModifierManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
