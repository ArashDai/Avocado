import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeCreateComponent } from './subtype-create.component';

describe('SubtypeCreateComponent', () => {
  let component: SubtypeCreateComponent;
  let fixture: ComponentFixture<SubtypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
