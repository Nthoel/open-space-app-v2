/**
 * test scenario for threadsReducer
 *
 * - threadsReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threads when given by receiveThreads action
 *  - should return the threads with new thread when given by addThread action
 *  - should return the threads with toggled upVote when given by toggleUpVoteThread action
 *  - should return the threads with toggled downVote when given by toggleDownVoteThread action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer, {
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
} from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = threadsReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by receiveThreads action', () => {
    // Arrange
    const initialState = [];
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

    // Action
    const nextState = threadsReducer(initialState, receiveThreads(fakeThreads));

    // Assert
    expect(nextState).toEqual(fakeThreads);
  });

  it('should return the threads with new thread when given by addThread action', () => {
    // Arrange
    const initialState = [
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
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread kedua',
      category: 'React',
      createdAt: '2021-06-21T08:00:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    // Action
    const nextState = threadsReducer(initialState, addThread(newThread));

    // Assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should return the threads with toggled upVote when given by toggleUpVoteThread action', () => {
    // Arrange
    const initialState = [
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

    // Action - add upvote
    const nextState = threadsReducer(
      initialState,
      toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-2' })
    );

    // Assert
    expect(nextState[0].upVotesBy).toContain('user-2');

    // Action - remove upvote (toggle)
    const nextState2 = threadsReducer(
      nextState,
      toggleUpVoteThread({ threadId: 'thread-1', userId: 'user-2' })
    );

    // Assert
    expect(nextState2[0].upVotesBy).not.toContain('user-2');
  });

  it('should return the threads with toggled downVote when given by toggleDownVoteThread action', () => {
    // Arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    // Action - add downvote (should also remove from upVotesBy)
    const nextState = threadsReducer(
      initialState,
      toggleDownVoteThread({ threadId: 'thread-1', userId: 'user-2' })
    );

    // Assert
    expect(nextState[0].downVotesBy).toContain('user-2');
    expect(nextState[0].upVotesBy).not.toContain('user-2');
  });
});
