import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationScanPage } from './station-scan.page';

describe('StationScanPage', () => {
  let component: StationScanPage;
  let fixture: ComponentFixture<StationScanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationScanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationScanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
