import { createSlice } from '@reduxjs/toolkit';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    
    // Vote Thread
    toggleUpVoteThreadDetail: (state, action) => {
      const userId = action.payload;
      if (state.upVotesBy.includes(userId)) {
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      } else {
        state.upVotesBy.push(userId);
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      }
    },
    toggleDownVoteThreadDetail: (state, action) => {
      const userId = action.payload;
      if (state.downVotesBy.includes(userId)) {
        state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
      } else {
        state.downVotesBy.push(userId);
        state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      }
    },
    neutralizeVoteThreadDetail: (state, action) => {
      const userId = action.payload;
      state.upVotesBy = state.upVotesBy.filter((id) => id !== userId);
      state.downVotesBy = state.downVotesBy.filter((id) => id !== userId);
    },

    // Comments
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },

    // Vote Comment
    toggleUpVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        if (comment.upVotesBy.includes(userId)) {
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        } else {
          comment.upVotesBy.push(userId);
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        }
      }
    },
    toggleDownVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        if (comment.downVotesBy.includes(userId)) {
          comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
        } else {
          comment.downVotesBy.push(userId);
          comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        }
      }
    },
    neutralizeVoteComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.upVotesBy = comment.upVotesBy.filter((id) => id !== userId);
        comment.downVotesBy = comment.downVotesBy.filter((id) => id !== userId);
      }
    },
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  neutralizeVoteThreadDetail,
  addComment,
  toggleUpVoteComment,
  toggleDownVoteComment,
  neutralizeVoteComment,
} = threadDetailSlice.actions;

export default threadDetailSlice.reducer;
