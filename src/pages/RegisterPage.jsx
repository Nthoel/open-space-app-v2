import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    if (result.success) {
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text mb-2">🚀 Daftar</h1>
          <p className="text-text-muted">
            Buat akun baru untuk bergabung di forum
          </p>
        </div>

        {/* Form */}
        <RegisterInput onRegister={onRegister} />

        {/* Footer */}
        <p className="text-center text-text-muted mt-6">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-primary hover:text-primary-hover">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
