import type { User } from './types';

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p><strong>ID:</strong> {user.id}</p>
          <p className="user-name"><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default UserList;