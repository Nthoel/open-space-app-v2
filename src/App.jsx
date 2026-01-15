import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { asyncPreloadProcess } from './states/isPreload/action';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/threads/:id" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
