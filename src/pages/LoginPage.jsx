import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncLoginUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    const result = await dispatch(asyncLoginUser({ email, password }));
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">🚀 Masuk</h1>
          <p className="text-text-muted">
            Selamat datang kembali di Night Space Forum
          </p>
        </div>

        {/* Form */}
        <LoginInput onLogin={onLogin} />

        {/* Footer */}
        <p className="text-center text-text-muted mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="text-primary hover:text-primary-hover">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
