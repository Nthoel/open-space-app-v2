import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BiLogOut, BiTrophy, BiHome, BiPlus, BiUser, BiX, BiPlanet } from 'react-icons/bi';
import { IoRocketSharp } from 'react-icons/io5';

function Navbar({ authUser, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    setShowProfileMenu(false);
    onLogout();
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden sm:block sticky top-0 z-50 glass">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center
                          group-hover:bg-primary/30 transition-colors">
              <IoRocketSharp className="text-primary text-xl" />
            </div>
            <div>
              <span className="text-lg font-bold text-text">Night Space</span>
              <span className="text-xs text-primary ml-1">FORUM</span>
            </div>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/leaderboard')}
              className={`btn-ghost flex items-center gap-2 ${
                isActive('/leaderboard') ? 'text-accent bg-accent/10' : ''
              }`}
            >
              <BiTrophy size={20} className="text-accent" />
              <span>Leaderboard</span>
            </button>

            {authUser ? (
              <div className="flex items-center gap-3 ml-2">
                <button
                  onClick={() => navigate('/threads/new')}
                  className="btn-primary flex items-center gap-2"
                >
                  <BiPlus size={18} />
                  <span>Launch Thread</span>
                </button>

                <div className="flex items-center gap-2 pl-3 border-l border-border">
                  <img
                    src={authUser.avatar}
                    alt={authUser.name}
                    className="w-9 h-9 rounded-full border-2 border-primary/50"
                  />
                  <span className="text-text text-sm font-medium max-w-[100px] truncate">
                    {authUser.name}
                  </span>
                  <button
                    onClick={onLogout}
                    className="btn-icon text-error hover:bg-error/10"
                    title="Logout"
                  >
                    <BiLogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <button
                  onClick={() => navigate('/login')}
                  className="btn-ghost"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-area-bottom">
        <div className="grid grid-cols-5 items-center py-2 px-2">
          {/* Home */}
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
              isActive('/') ? 'text-primary' : 'text-text-muted'
            }`}
          >
            <BiHome size={22} />
            <span className="text-[10px]">Home</span>
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => navigate('/leaderboard')}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-colors ${
              isActive('/leaderboard') ? 'text-accent' : 'text-text-muted'
            }`}
          >
            <BiTrophy size={22} />
            <span className="text-[10px]">Ranking</span>
          </button>

          {/* Center Add Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (authUser) {
                  navigate('/threads/new');
                } else {
                  navigate('/login');
                }
              }}
              className="flex items-center justify-center w-12 h-12 -mt-5
                       bg-primary rounded-full shadow-lg transform hover:scale-105 transition-transform"
              style={{ boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
            >
              <BiPlus size={24} className="text-white" />
            </button>
          </div>

          {/* Profile / Login */}
          {authUser ? (
            <button
              onClick={() => setShowProfileMenu(true)}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-text-muted"
            >
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="w-6 h-6 rounded-full border border-border"
              />
              <span className="text-[10px]">Profile</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-text-muted"
            >
              <BiUser size={22} />
              <span className="text-[10px]">Sign In</span>
            </button>
          )}

          {/* Logout / Register */}
          {authUser ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-text-muted hover:text-error"
            >
              <BiLogOut size={22} />
              <span className="text-[10px]">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/register')}
              className="flex flex-col items-center gap-1 py-2 rounded-xl text-text-muted"
            >
              <BiPlanet size={22} />
              <span className="text-[10px]">Daftar</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Profile Menu Modal */}
      {showProfileMenu && authUser && (
        <div className="sm:hidden fixed inset-0 z-[60] flex items-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowProfileMenu(false)}
          />
          <div className="relative w-full bg-card border-t border-border rounded-t-3xl p-6 animate-slide-up">
            <button
              onClick={() => setShowProfileMenu(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text"
            >
              <BiX size={24} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="w-16 h-16 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="text-lg font-bold text-text">{authUser.name}</h3>
                <p className="text-text-muted text-sm">{authUser.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 bg-error/10 text-error rounded-xl font-medium
                       hover:bg-error/20 transition-colors flex items-center justify-center gap-2"
            >
              <BiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
