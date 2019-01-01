import { TestBed } from '@angular/core/testing';

import { SqlserviceService } from './sqlservice.service';

describe('SqlserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SqlserviceService = TestBed.get(SqlserviceService);
    expect(service).toBeTruthy();
  });
});
