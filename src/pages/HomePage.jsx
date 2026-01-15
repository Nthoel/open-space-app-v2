import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncLogoutUser } from '../states/authUser/action';

function HomePage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncLogoutUser());
    navigate('/login');
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text">🚀 Night Space Forum</h1>
          
          {authUser ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={authUser.avatar} 
                  alt={authUser.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-text">{authUser.name}</span>
              </div>
              <button onClick={onLogout} className="btn-secondary text-sm">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
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

        {/* Content Placeholder */}
        <div className="card">
          <h2 className="text-xl font-semibold text-text mb-4">
            {authUser ? `Halo, ${authUser.name}! 👋` : 'Selamat Datang!'}
          </h2>
          <p className="text-text-muted">
            {authUser 
              ? 'Kamu sudah login. Fitur threads akan ditambahkan selanjutnya.'
              : 'Silakan login atau daftar untuk mulai berdiskusi.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
