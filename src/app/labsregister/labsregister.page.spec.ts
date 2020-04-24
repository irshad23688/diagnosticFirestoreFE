import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsregisterPage } from './labsregister.page';

describe('LabsregisterPage', () => {
  let component: LabsregisterPage;
  let fixture: ComponentFixture<LabsregisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabsregisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsregisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
