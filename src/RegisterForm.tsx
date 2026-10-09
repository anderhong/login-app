import { useState } from 'react';
import { storage } from './storage';

interface RegisterFormProps {
  onSuccess: () => void;
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !password) {
      setMessage('❌ Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setMessage('❌ Please enter a valid email');
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      return;
    }

    // Check if email already exists
    if (storage.findByEmail(email)) {
      setMessage('❌ Email already registered');
      return;
    }

    // Save User
    const user = storage.add({ name, email, password });
    setMessage(`✅ Welcome, ${user.name}!`);

    // Clear Form
    setName('');
    setEmail('');
    setPassword('');

    // Notify Parent
    onSuccess();
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Register
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{message}</p>
      )}
    </div>
  );
}

export default RegisterForm;