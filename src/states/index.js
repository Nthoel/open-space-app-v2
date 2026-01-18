import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import usersReducer from './users/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authUser'], 
};

const rootReducer = combineReducers({
  authUser: authUserReducer,
  isPreload: isPreloadReducer,
  threads: threadsReducer,
  users: usersReducer,
  threadDetail: threadDetailReducer,
  leaderboards: leaderboardsReducer,
  loadingBar: loadingBarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
