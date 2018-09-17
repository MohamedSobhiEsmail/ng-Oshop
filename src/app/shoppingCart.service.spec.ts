import { TestBed, inject } from '@angular/core/testing';

import { shoppingCartService } from './shoppingCart.service';

describe('CartServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [shoppingCartService]
    });
  });

  it('should be created', inject([shoppingCartService], (service: shoppingCartService) => {
    expect(service).toBeTruthy();
  }));
});
