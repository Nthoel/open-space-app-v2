import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiTrophy, BiArrowBack } from 'react-icons/bi';

import Navbar from '../components/Navbar';
import LeaderboardItem from '../components/LeaderboardItem';

import { asyncLogoutUser } from '../states/authUser/action';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((state) => state.authUser);
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar authUser={authUser} onLogout={onLogout} />

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-text-muted hover:text-text mb-6 transition-colors"
        >
          <BiArrowBack size={20} />
          <span>Kembali ke Beranda</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
            <BiTrophy size={32} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">Leaderboard</h1>
          <p className="text-text-muted">
            Pengguna paling aktif di Night Space Forum
          </p>
        </div>

        {/* Leaderboard List */}
        {leaderboards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4 animate-pulse-slow">🚀</div>
            <p className="text-text-muted">Memuat leaderboard...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboards.map((item, index) => (
              <LeaderboardItem
                key={item.user.id}
                user={item.user}
                score={item.score}
                rank={index + 1}
              />
            ))}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 p-4 bg-card border border-border rounded-lg">
          <h3 className="text-text font-medium mb-2">📊 Cara Menghitung Skor</h3>
          <p className="text-text-muted text-sm">
            Skor dihitung berdasarkan aktivitas: membuat thread, memberikan komentar, 
            dan menerima upvote dari pengguna lain.
          </p>
        </div>
      </main>
    </div>
  );
}

export default LeaderboardPage;
