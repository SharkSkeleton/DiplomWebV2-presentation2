import { TestBed } from '@angular/core/testing';

import { SocketWorkSpaceService } from './socket-work-space.service';

describe('SocketWorkSpaceService', () => {
  let service: SocketWorkSpaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketWorkSpaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
