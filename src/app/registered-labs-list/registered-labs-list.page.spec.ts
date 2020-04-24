import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredLabsListPage } from './registered-labs-list.page';

describe('RegisteredLabsListPage', () => {
  let component: RegisteredLabsListPage;
  let fixture: ComponentFixture<RegisteredLabsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredLabsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredLabsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
