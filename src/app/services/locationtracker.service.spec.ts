import { TestBed } from '@angular/core/testing';

import { LocationtrackerService } from './locationtracker.service';

describe('LocationtrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocationtrackerService = TestBed.get(LocationtrackerService);
    expect(service).toBeTruthy();
  });
});
