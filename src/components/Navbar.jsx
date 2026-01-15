import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { BiLogOut, BiTrophy } from 'react-icons/bi';

function Navbar({ authUser, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🚀</span>
          <span className="text-xl font-bold text-text hidden sm:inline">
            Night Space Forum
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* Leaderboard Link */}
          <button
            onClick={() => navigate('/leaderboard')}
            className="btn-ghost flex items-center gap-1 text-sm"
            title="Leaderboard"
          >
            <BiTrophy size={20} className="text-accent" />
            <span className="hidden sm:inline">Leaderboard</span>
          </button>

          {authUser ? (
            <div className="flex items-center gap-3">
              {/* User Info */}
              <div className="flex items-center gap-2">
                <img
                  src={authUser.avatar}
                  alt={authUser.name}
                  className="w-8 h-8 rounded-full border border-border"
                />
                <span className="text-text text-sm hidden sm:inline">
                  {authUser.name}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="btn-ghost text-sm flex items-center gap-1 text-error"
                title="Logout"
              >
                <BiLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="btn-ghost text-sm"
              >
                Masuk
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-sm"
              >
                Daftar
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
