import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiUser, BiEnvelope, BiLock } from 'react-icons/bi';

function RegisterInput({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Semua field harus diisi!');
      return;
    }
    if (password.length < 6) {
      alert('Password minimal 6 karakter!');
      return;
    }
    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text-muted mb-2">
          Nama
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <BiUser className="text-text-muted" size={20} />
          </div>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            className="input-field pl-12"
            required
          />
        </div>
      </div>

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
            placeholder="Minimal 6 karakter"
            className="input-field pl-12"
            minLength={6}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn-primary w-full py-3 text-base font-semibold">
        Daftar
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
