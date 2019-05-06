import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierDetailsComponent } from './modifier-details.component';

describe('ModifierDetailsComponent', () => {
  let component: ModifierDetailsComponent;
  let fixture: ComponentFixture<ModifierDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
