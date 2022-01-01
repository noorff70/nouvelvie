import { TestBed } from '@angular/core/testing';

import { RestservicePointService } from './restservice-point.service';

describe('RestservicePointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestservicePointService = TestBed.get(RestservicePointService);
    expect(service).toBeTruthy();
  });
});
