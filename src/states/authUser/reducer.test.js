/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the authUser when given by setAuthUser action
 *  - should return null when given by unsetAuthUser action
 */

import { describe, it, expect } from 'vitest';
import authUserReducer, { setAuthUser, unsetAuthUser } from './reducer';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = authUserReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the authUser when given by setAuthUser action', () => {
    // Arrange
    const initialState = null;
    const fakeUser = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    // Action
    const nextState = authUserReducer(initialState, setAuthUser(fakeUser));

    // Assert
    expect(nextState).toEqual(fakeUser);
  });

  it('should return null when given by unsetAuthUser action', () => {
    // Arrange
    const initialState = {
      id: 'user-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar.jpg',
    };

    // Action
    const nextState = authUserReducer(initialState, unsetAuthUser());

    // Assert
    expect(nextState).toBeNull();
  });
});
