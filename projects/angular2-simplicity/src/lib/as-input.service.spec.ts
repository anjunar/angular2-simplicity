import { TestBed } from '@angular/core/testing';

import { AsInputService } from './as-input.service';

describe('AsInputService', () => {
  let service: AsInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
