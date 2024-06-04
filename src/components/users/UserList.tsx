import React, { useEffect, useState } from 'react';
import UserService from '../../services/UserService';
import { User } from '../../models/User';
import { Table, TableCell, TableHead } from '@mui/material';
import '../../styles/UserList.css';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('There was an error fetching the users!', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="user-list-page">
      <div className="user-list-container">
        <h2 className="user-list-header">User List</h2>
        <Table className="user-list-table">
          <TableHead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </TableHead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
