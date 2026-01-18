import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

import { asyncPreloadProcess } from './states/isPreload/action';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CreateThreadPage from './pages/CreateThreadPage';

function App() {
  const dispatch = useDispatch();
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-pulse-slow">🚀</div>
          <p className="text-text-muted">Memuat Night Space Forum...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Loading Bar di top */}
      <LoadingBar style={{ backgroundColor: '#a855f7', height: '3px' }} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/threads/new" element={<CreateThreadPage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </>
  );
}

export default App;
