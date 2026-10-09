import { useState, useEffect } from 'react';
import type { User } from './types';
import UserList from './UserList';
import UserForm from './UserForm';
import LoginForm from './LoginForm';
import './App.css';

const STORAGE_KEY = 'users';

const defaultUsers: User[] = [
  { id: 1, name: 'Anderson', email: 'anderson@example.com', password: 'password123' },
  { id: 2, name: 'Alice', email: 'alice@example.com', password: 'password123' },
  { id: 3, name: 'Bob', email: 'bob@example.com', password: 'password123' },
];

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');  // 🆕
  const [currentUser, setCurrentUser] = useState<User | null>(null);  // 🆕

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUsers(JSON.parse(saved));
      } catch (err) {
        setUsers(defaultUsers);
      }
    } else {
      setUsers(defaultUsers);
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  }, [users]);

  const handleAddUser = (newUser: Omit<User, 'id'>) => {
    const newId = users.length > 0
      ? Math.max(...users.map(u => u.id)) + 1
      : 1;

    const user: User = {
      ...newUser,
      id: newId,
    };

    setUsers([...users, user]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all users?')) {
      localStorage.removeItem(STORAGE_KEY);
      setUsers([]);
      setCurrentUser(null);
    }
  };

  return (
    <div className="App">
      <h1>Login / Register App</h1>

      {/* 已登入狀態 */}
      {currentUser ? (
        <div style={{
          maxWidth: '400px',
          margin: '20px auto',
          padding: '20px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          textAlign: 'center',
        }}>
          <h2>👋 Welcome, {currentUser.name}!</h2>
          <p>Email: {currentUser.email}</p>
          <button onClick={handleLogout} style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
            🚪 Logout
          </button>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <button
              onClick={() => setActiveTab('register')}
              style={{
                padding: '10px 20px',
                marginRight: '10px',
                backgroundColor: activeTab === 'register' ? '#4CAF50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Register
            </button>
            <button
              onClick={() => setActiveTab('login')}
              style={{
                padding: '10px 20px',
                backgroundColor: activeTab === 'login' ? '#4CAF50' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Login
            </button>
          </div>

          {/* Form */}
          {activeTab === 'register' ? (
            <UserForm onAdd={handleAddUser} />
          ) : (
            <LoginForm users={users} onLogin={handleLogin} />
          )}
        </>
      )}

      {/* Clear All + User List */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handleClearAll} style={{
          padding: '10px 20px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
          🗑️ Clear All Users
        </button>
      </div>

      <UserList users={users} />
    </div>
  );
}

export default App;