import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemSelectorComponent } from './menu-item-selector.component';

describe('MenuItemSelectorComponent', () => {
  let component: MenuItemSelectorComponent;
  let fixture: ComponentFixture<MenuItemSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
