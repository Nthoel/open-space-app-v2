import { createSlice } from '@reduxjs/toolkit';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleUpVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(userId)
              ? thread.upVotesBy.filter((id) => id !== userId)
              : thread.upVotesBy.concat(userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    },
    toggleDownVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(userId)
              ? thread.downVotesBy.filter((id) => id !== userId)
              : thread.downVotesBy.concat(userId),
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    },
    neutralizeVoteThread: (state, action) => {
      const { threadId, userId } = action.payload;
      return state.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.filter((id) => id !== userId),
            downVotesBy: thread.downVotesBy.filter((id) => id !== userId),
          };
        }
        return thread;
      });
    },
  },
});

export const {
  receiveThreads,
  addThread,
  toggleUpVoteThread,
  toggleDownVoteThread,
  neutralizeVoteThread,
} = threadsSlice.actions;

export default threadsSlice.reducer;
