import { TestBed } from '@angular/core/testing';

import { CrudRepositoryService } from './crud-repository.service';

describe('CrudRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrudRepositoryService = TestBed.get(CrudRepositoryService);
    expect(service).toBeTruthy();
  });
});
