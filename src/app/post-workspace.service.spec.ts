import { TestBed } from '@angular/core/testing';

import { PostWorkspaceService } from './post-workspace.service';

describe('PostWorkspaceService', () => {
  let service: PostWorkspaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostWorkspaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
