import { createThread } from '../../utils/api';
import { addThread, toggleUpVoteThread, toggleDownVoteThread, neutralizeVoteThread } from './reducer';
import { upVoteThread, downVoteThread, neutralizeVoteThread as apiNeutralizeVote } from '../../utils/api';

// Async Thunk: Create Thread
function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch, getState) => {
    try {
      const thread = await createThread({ title, body, category });
      const { authUser } = getState();
      dispatch(addThread({ ...thread, owner: authUser }));
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false };
    }
  };
}

// Async Thunk: Up Vote Thread (Optimistic Update)
function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    // Optimistic update
    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));

    try {
      await upVoteThread(threadId);
    } catch (error) {
      // Rollback jika gagal
      dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

// Async Thunk: Down Vote Thread (Optimistic Update)
function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    // Optimistic update
    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));

    try {
      await downVoteThread(threadId);
    } catch (error) {
      // Rollback jika gagal
      dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
      alert(error.message);
    }
  };
}

// Async Thunk: Neutralize Vote Thread
function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(neutralizeVoteThread({ threadId, userId: authUser.id }));

    try {
      await apiNeutralizeVote(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeVoteThread,
};
