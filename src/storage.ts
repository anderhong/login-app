import type { User } from './types';

const STORAGE_KEY = 'users';

export const storage = {
  // 攞所有 Users
  getAll(): User[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // 儲存所有 Users
  saveAll(users: User[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  // 加一個 User
  add(user: Omit<User, 'id' | 'createdAt'>): User {
    const users = this.getAll();
    const newUser: User = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    this.saveAll(users);
    return newUser;
  },

  // 搵 User by Email
  findByEmail(email: string): User | undefined {
    return this.getAll().find(u => u.email === email);
  },

  // 清除所有
  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};