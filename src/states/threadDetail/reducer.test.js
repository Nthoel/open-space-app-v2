/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threadDetail when given by receiveThreadDetail action
 *  - should return null when given by clearThreadDetail action
 *  - should return the threadDetail with new comment when given by addComment action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer, {
  receiveThreadDetail,
  clearThreadDetail,
  addComment,
  toggleUpVoteThreadDetail,
} from './reducer';

describe('threadDetailReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by receiveThreadDetail action', () => {
    // Arrange
    const initialState = null;
    const fakeThreadDetail = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    // Action
    const nextState = threadDetailReducer(
      initialState,
      receiveThreadDetail(fakeThreadDetail)
    );

    // Assert
    expect(nextState).toEqual(fakeThreadDetail);
  });

  it('should return null when given by clearThreadDetail action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    // Action
    const nextState = threadDetailReducer(initialState, clearThreadDetail());

    // Assert
    expect(nextState).toBeNull();
  });

  it('should return the threadDetail with new comment when given by addComment action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };
    const newComment = {
      id: 'comment-1',
      content: 'Ini adalah komentar',
      createdAt: '2021-06-21T08:00:00.000Z',
      owner: {
        id: 'user-2',
        name: 'Jane Doe',
        avatar: 'https://example.com/avatar2.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };

    // Action
    const nextState = threadDetailReducer(initialState, addComment(newComment));

    // Assert
    expect(nextState.comments).toHaveLength(1);
    expect(nextState.comments[0]).toEqual(newComment);
  });

  it('should return the threadDetail with toggled upVote when given by toggleUpVoteThreadDetail action', () => {
    // Arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    // Action
    const nextState = threadDetailReducer(
      initialState,
      toggleUpVoteThreadDetail('user-2')
    );

    // Assert
    expect(nextState.upVotesBy).toContain('user-2');
  });
});
