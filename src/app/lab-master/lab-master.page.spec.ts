import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMasterPage } from './lab-master.page';

describe('LabMasterPage', () => {
  let component: LabMasterPage;
  let fixture: ComponentFixture<LabMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabMasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
