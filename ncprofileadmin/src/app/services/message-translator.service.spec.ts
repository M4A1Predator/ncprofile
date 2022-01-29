import { TestBed } from '@angular/core/testing';

import { MessageTranslatorService } from './message-translator.service';

describe('MessageTranslatorService', () => {
  let service: MessageTranslatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageTranslatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
