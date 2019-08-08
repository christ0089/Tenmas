import { TestBed } from '@angular/core/testing';

import { RfcsService } from './rfcs.service';

describe('RfcsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RfcsService = TestBed.get(RfcsService);
    expect(service).toBeTruthy();
  });
});
