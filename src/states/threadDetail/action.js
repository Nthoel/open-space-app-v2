import {
  getThreadDetail,
  createComment,
  upVoteThread,
  downVoteThread,
  neutralizeVoteThread,
  upVoteComment,
  downVoteComment,
  neutralizeVoteComment,
} from '../../utils/api';

import {
  receiveThreadDetail,
  clearThreadDetail,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  neutralizeVoteThreadDetail,
  addComment,
  toggleUpVoteComment,
  toggleDownVoteComment,
} from './reducer';

// Async Thunk: Get Thread Detail
function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetail());
    try {
      const threadDetail = await getThreadDetail(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

// Async Thunk: Add Comment
function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await createComment({ threadId, content });
      dispatch(addComment(comment));
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false };
    }
  };
}

// Async Thunk: Vote Thread Detail (Optimistic Update)
function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    dispatch(toggleUpVoteThreadDetail(authUser.id));

    try {
      await upVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(toggleUpVoteThreadDetail(authUser.id)); // Rollback
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    dispatch(toggleDownVoteThreadDetail(authUser.id));

    try {
      await downVoteThread(threadDetail.id);
    } catch (error) {
      dispatch(toggleDownVoteThreadDetail(authUser.id)); // Rollback
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return;

    dispatch(neutralizeVoteThreadDetail(authUser.id));

    try {
      await neutralizeVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

// Async Thunk: Vote Comment (Optimistic Update)
function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    dispatch(toggleUpVoteComment({ commentId, userId: authUser.id }));

    try {
      await upVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(toggleUpVoteComment({ commentId, userId: authUser.id })); // Rollback
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan login untuk vote!');
      return;
    }

    dispatch(toggleDownVoteComment({ commentId, userId: authUser.id }));

    try {
      await downVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      dispatch(toggleDownVoteComment({ commentId, userId: authUser.id })); // Rollback
      alert(error.message);
    }
  };
}

function asyncNeutralizeVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) return;

    dispatch(neutralizeVoteComment({ commentId, userId: authUser.id }));

    try {
      await neutralizeVoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteComment,
};
