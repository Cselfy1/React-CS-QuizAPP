import React, { useState } from 'react';
import './AuthForm.css';

interface RegisterFormProps {
  onRegisterSuccess: (token: string) => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('https://localhost:7091/api/Auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password, birthDate }),
      });

      if (!response.ok) {
        const error = await response.text();
        setErrorMsg(error || 'Registration failed');
      } else {
        const data = await response.json();
        onRegisterSuccess(data.token || 'dummy-token');
      }
    } catch {
      setErrorMsg('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <h2 className="form-title">Register</h2>

        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <input
          type="date"
          placeholder="Birth Date"
          value={birthDate}
          onChange={e => setBirthDate(e.target.value)}
          required
        />

        {errorMsg && <div className="error-msg">{errorMsg}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
