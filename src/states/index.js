import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import threadDetailReducer from './threadDetail/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    threadDetail: threadDetailReducer,
  },
});

export default store;
