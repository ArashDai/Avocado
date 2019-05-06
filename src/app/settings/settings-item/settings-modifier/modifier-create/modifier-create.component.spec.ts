import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCreateComponent } from './modifier-create.component';

describe('ModifierCreateComponent', () => {
  let component: ModifierCreateComponent;
  let fixture: ComponentFixture<ModifierCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
