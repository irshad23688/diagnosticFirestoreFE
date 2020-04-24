import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabPage } from './new-lab.page';

describe('NewLabPage', () => {
  let component: NewLabPage;
  let fixture: ComponentFixture<NewLabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
