import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxManagerComponent } from './tax-manager.component';

describe('TaxManagerComponent', () => {
  let component: TaxManagerComponent;
  let fixture: ComponentFixture<TaxManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
