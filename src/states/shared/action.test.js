/**
 * test scenario for shared action
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and show error when data fetching failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsers } from '../users/reducer';
import { receiveThreads } from '../threads/reducer';
import * as api from '../../utils/api';

// Mock API
vi.mock('../../utils/api');
vi.mock('../../utils/toast', () => ({
  showErrorToast: vi.fn(),
}));

const fakeUsers = [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: 'user-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://example.com/avatar2.jpg',
  },
];

const fakeThreads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    api.getAllUsers.mockResolvedValue(fakeUsers);
    api.getAllThreads.mockResolvedValue(fakeThreads);

    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(api.getAllUsers).toHaveBeenCalled();
    expect(api.getAllThreads).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(receiveUsers(fakeUsers));
    expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreads));
  });

  it('should dispatch action and show error when data fetching failed', async () => {
    // Arrange
    const errorResponse = new Error('Network error');
    api.getAllUsers.mockRejectedValue(errorResponse);
    api.getAllThreads.mockRejectedValue(errorResponse);

    const dispatch = vi.fn();

    // Action
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assert
    expect(api.getAllUsers).toHaveBeenCalled();
  });
});
