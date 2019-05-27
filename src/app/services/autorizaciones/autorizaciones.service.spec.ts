import { TestBed } from '@angular/core/testing';

import { AutorizacionesService } from './autorizaciones.service';

describe('AutorizacionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutorizacionesService = TestBed.get(AutorizacionesService);
    expect(service).toBeTruthy();
  });
});
