import { TestBed } from '@angular/core/testing';

import { RepriseService } from './reprise.service';

describe('RepriseManagerService', () => {
  let service: RepriseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepriseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
