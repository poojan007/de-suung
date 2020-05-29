import { TestBed } from '@angular/core/testing';

import { LocationTrackingService } from './location-tracking.service';

describe('LocationTrackingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationTrackingService = TestBed.get(LocationTrackingService);
    expect(service).toBeTruthy();
  });
});
