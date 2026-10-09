import { useState } from 'react';
import type { User } from './types';

interface UserFormProps {
  onAdd: (user: Omit<User, 'id'>) => void;
}

function UserForm({ onAdd }: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  // 🆕

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    if (password.length < 6) {  // 🆕
      alert('Password must be at least 6 characters');
      return;
    }

    // Call Parent Callback
    onAdd({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),  // 🆕
    });

    // Clear Form
    setName('');
    setEmail('');
    setPassword('');  // 🆕
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>

      {/* 🆕 Password Field */}
      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password (min 6 chars)"
        />
      </div>

      <button type="submit">➕ Register</button>
    </form>
  );
}

export default UserForm;