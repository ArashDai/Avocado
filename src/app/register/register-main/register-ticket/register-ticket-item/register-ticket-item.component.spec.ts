import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTicketItemComponent } from './register-ticket-item.component';

describe('RegisterTicketItemComponent', () => {
  let component: RegisterTicketItemComponent;
  let fixture: ComponentFixture<RegisterTicketItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterTicketItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTicketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
