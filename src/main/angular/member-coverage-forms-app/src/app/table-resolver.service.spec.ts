import { TestBed } from '@angular/core/testing';

import { TableResolverService } from './table-resolver.service';

describe('TableResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableResolverService = TestBed.get(TableResolverService);
    expect(service).toBeTruthy();
  });
});
