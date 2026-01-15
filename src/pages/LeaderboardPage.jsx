import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BiTrophy, BiArrowBack, BiMedal } from 'react-icons/bi';

import Navbar from '../components/Navbar';
import StarsBackground from '../components/StarsBackground';

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

  const getMedalStyle = (rank) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10',
          border: 'border-yellow-500/50',
          icon: 'text-yellow-400',
          glow: '0 0 20px rgba(234, 179, 8, 0.3)',
        };
      case 2:
        return {
          bg: 'bg-gradient-to-r from-gray-400/20 to-gray-500/10',
          border: 'border-gray-400/50',
          icon: 'text-gray-300',
          glow: '0 0 15px rgba(156, 163, 175, 0.3)',
        };
      case 3:
        return {
          bg: 'bg-gradient-to-r from-orange-500/20 to-orange-600/10',
          border: 'border-orange-500/50',
          icon: 'text-orange-400',
          glow: '0 0 15px rgba(249, 115, 22, 0.3)',
        };
      default:
        return {
          bg: 'bg-card/50',
          border: 'border-border',
          icon: 'text-text-muted',
          glow: 'none',
        };
    }
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-0">
      <StarsBackground />
      <Navbar authUser={authUser} onLogout={onLogout} />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-6">
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
          <div className="inline-flex items-center justify-center w-20 h-20 
                        bg-gradient-to-br from-accent/30 to-primary/20 
                        rounded-2xl mb-4 animate-float"
               style={{ boxShadow: '0 0 40px rgba(236, 72, 153, 0.3)' }}>
            <BiTrophy size={40} className="text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Leaderboard
          </h1>
          <p className="text-text-muted">
            Pengguna paling aktif di Night Space Forum
          </p>
        </div>

        {/* Leaderboard List */}
        {leaderboards.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 animate-float">🚀</div>
            <p className="text-text-muted">Memuat leaderboard...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboards.map((item, index) => {
              const rank = index + 1;
              const style = getMedalStyle(rank);
              
              return (
                <div
                  key={item.user.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border 
                            ${style.bg} ${style.border} backdrop-blur-sm
                            transition-all duration-300 hover:scale-[1.02] animate-fade-in`}
                  style={{ 
                    boxShadow: style.glow,
                    animationDelay: `${index * 50}ms` 
                  }}
                >
                  {/* Rank Badge */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-xl
                                ${rank <= 3 ? 'bg-white/10' : 'bg-transparent'}`}>
                    {rank <= 3 ? (
                      <BiMedal size={28} className={style.icon} />
                    ) : (
                      <span className="text-lg font-bold text-text-muted">{rank}</span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={item.user.avatar}
                    alt={item.user.name}
                    className={`rounded-full border-2 ${
                      rank === 1 ? 'w-14 h-14 border-yellow-500' : 
                      rank === 2 ? 'w-12 h-12 border-gray-400' :
                      rank === 3 ? 'w-12 h-12 border-orange-500' :
                      'w-10 h-10 border-border'
                    }`}
                  />

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold truncate ${
                      rank === 1 ? 'text-lg text-yellow-400' : 'text-text'
                    }`}>
                      {item.user.name}
                    </p>
                    <p className="text-text-muted text-sm truncate">
                      {item.user.email}
                    </p>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <p className={`font-bold ${
                      rank === 1 ? 'text-2xl text-yellow-400' :
                      rank === 2 ? 'text-xl text-gray-300' :
                      rank === 3 ? 'text-xl text-orange-400' :
                      'text-lg text-primary'
                    }`}>
                      {item.score}
                    </p>
                    <p className="text-text-muted text-xs">poin</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default LeaderboardPage;
