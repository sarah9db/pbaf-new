import { TestBed } from '@angular/core/testing';

import { RelatedArticlesServiceService } from './related-articles-service.service';

describe('RelatedArticlesServiceService', () => {
  let service: RelatedArticlesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedArticlesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
