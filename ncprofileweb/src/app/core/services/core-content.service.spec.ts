import { TestBed } from '@angular/core/testing';

import { CoreContentService } from './core-content.service';

describe('CoreContentService', () => {
  let service: CoreContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
