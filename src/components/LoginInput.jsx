import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiEnvelope, BiLock } from 'react-icons/bi';

function LoginInput({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Semua field harus diisi!');
      return;
    }
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-muted mb-2">
          Email
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <BiEnvelope className="text-text-muted" size={20} />
          </div>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            className="input-field pl-12"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-muted mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <BiLock className="text-text-muted" size={20} />
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            className="input-field pl-12"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-primary w-full py-3 text-base font-semibold">
        Masuk
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
