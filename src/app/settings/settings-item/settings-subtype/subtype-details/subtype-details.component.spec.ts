import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtypeDetailsComponent } from './subtype-details.component';

describe('SubtypeDetailsComponent', () => {
  let component: SubtypeDetailsComponent;
  let fixture: ComponentFixture<SubtypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
