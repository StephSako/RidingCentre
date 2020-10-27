import { TestBed } from '@angular/core/testing';

import { ChevalService } from './cheval.service';

describe('ChevalService', () => {
  let service: ChevalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChevalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
