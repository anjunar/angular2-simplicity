import { TestBed } from '@angular/core/testing';

import { AsGenericResolver } from './as-generic.resolver';

describe('AsGenericResolver', () => {
  let resolver: AsGenericResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AsGenericResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
