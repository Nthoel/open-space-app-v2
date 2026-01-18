/**
 * test scenario for authUser action
 *
 * - asyncLoginUser thunk
 *  - should dispatch action correctly when login success
 *  - should dispatch action and show error when login failed
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when register success
 *  - should dispatch action and show error when register failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { asyncLoginUser, asyncRegisterUser } from './action';
import { setAuthUser } from './reducer';
import * as api from '../../utils/api';

// Mock modules
vi.mock('../../utils/api');
vi.mock('../../utils/toast', () => ({
  showSuccessToast: vi.fn(),
  showErrorToast: vi.fn(),
}));

const fakeUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

const fakeToken = 'fake-token-12345';

const fakeErrorResponse = new Error('Email or password is wrong');

describe('asyncLoginUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch action correctly when login success', async () => {
    // Arrange
    api.login.mockResolvedValue(fakeToken);
    api.putAccessToken.mockImplementation(() => {});
    api.getOwnProfile.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Action
    const result = await asyncLoginUser({ email: 'john@example.com', password: 'password123' })(dispatch, getState);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'password123' });
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(api.getOwnProfile).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
    expect(result.success).toBe(true);
  });

  it('should dispatch action and show error when login failed', async () => {
    // Arrange
    api.login.mockRejectedValue(fakeErrorResponse);

    const dispatch = vi.fn();
    const getState = vi.fn();

    // Action
    const result = await asyncLoginUser({ email: 'john@example.com', password: 'wrongpassword' })(dispatch, getState);

    // Assert
    expect(api.login).toHaveBeenCalledWith({ email: 'john@example.com', password: 'wrongpassword' });
    expect(result.success).toBe(false);
  });
});

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should dispatch action correctly when register success', async () => {
    // Arrange
    api.register.mockResolvedValue(fakeUser);

    const dispatch = vi.fn();

    // Action
    const result = await asyncRegisterUser({ 
      name: 'John Doe', 
      email: 'john@example.com', 
      password: 'password123' 
    })(dispatch);

    // Assert
    expect(api.register).toHaveBeenCalledWith({ 
      name: 'John Doe', 
      email: 'john@example.com', 
      password: 'password123' 
    });
    expect(result.success).toBe(true);
  });

  it('should dispatch action and show error when register failed', async () => {
    // Arrange
    const errorResponse = new Error('Email already exists');
    api.register.mockRejectedValue(errorResponse);

    const dispatch = vi.fn();

    // Action
    const result = await asyncRegisterUser({ 
      name: 'John Doe', 
      email: 'john@example.com', 
      password: 'password123' 
    })(dispatch);

    // Assert
    expect(result.success).toBe(false);
  });
});
