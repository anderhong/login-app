import { useState } from 'react';
import type { User } from './types';

interface LoginFormProps {
  users: User[];
  onLogin: (user: User) => void;
}

function LoginForm({ users, onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    // 搵 User by Email
    const user = users.find(u => u.email === email.trim());

    if (!user) {
      setMessage('❌ User not found');
      return;
    }

    if (user.password !== password.trim()) {
      setMessage('❌ Incorrect password');
      return;
    }

    // 成功
    setMessage(`✅ Welcome back, ${user.name}!`);
    onLogin(user);

    // Clear Form
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <h2>🔐 Login</h2>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>

      <button type="submit">🔓 Login</button>

      {message && (
        <p style={{ marginTop: '10px', fontWeight: 'bold', textAlign: 'center' }}>
          {message}
        </p>
      )}
    </form>
  );
}

export default LoginForm;