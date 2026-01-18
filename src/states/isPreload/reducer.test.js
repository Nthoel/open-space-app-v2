/**
 * test scenario for isPreloadReducer
 *
 * - isPreloadReducer function
 *  - should return the initial state when given by unknown action
 *  - should return false when given by setIsPreload action with false payload
 *  - should return true when given by setIsPreload action with true payload
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer, { setIsPreload } from './reducer';

describe('isPreloadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = isPreloadReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return false when given by setIsPreload action with false payload', () => {
    // Arrange
    const initialState = true;

    // Action
    const nextState = isPreloadReducer(initialState, setIsPreload(false));

    // Assert
    expect(nextState).toBe(false);
  });

  it('should return true when given by setIsPreload action with true payload', () => {
    // Arrange
    const initialState = false;

    // Action
    const nextState = isPreloadReducer(initialState, setIsPreload(true));

    // Assert
    expect(nextState).toBe(true);
  });
});
