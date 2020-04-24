import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaytmtestPage } from './paytmtest.page';

describe('PaytmtestPage', () => {
  let component: PaytmtestPage;
  let fixture: ComponentFixture<PaytmtestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaytmtestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaytmtestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
