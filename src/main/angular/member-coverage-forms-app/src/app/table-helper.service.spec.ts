import { TestBed } from '@angular/core/testing';

import { TableHelperService } from './table-helper.service';

describe('TableHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableHelperService = TestBed.get(TableHelperService);
    expect(service).toBeTruthy();
  });
});
