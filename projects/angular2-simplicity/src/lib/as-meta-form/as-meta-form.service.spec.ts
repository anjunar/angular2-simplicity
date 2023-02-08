import { TestBed } from '@angular/core/testing';

import { AsMetaFormService } from './as-meta-form.service';

describe('AsMetaFormService', () => {
  let service: AsMetaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsMetaFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
