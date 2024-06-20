import React, { useEffect, useState } from 'react';
import UserService from '../../../services/UserService';
import { User } from '../../../models/User';
import { Button, Table, TableCell, TableHead } from '@mui/material';
import '../../../styles/UserList.css';
import axios from 'axios';
import SearchBar from '../../SearchBar';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(
          t('userlist.There was an error fetching the users!'),
          error,
        );
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter((user) => user.userId !== userId));
      alert(t('userlist.User deleted successfully!'));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          t('userlist.There was an error deleting the user!'),
          error,
        );
        setError(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  const searchUser = async (searchValue: string) => {
    try {
      let response;
      if (isNaN(parseInt(searchValue))) {
        response =
          (await UserService.getUserByUsername(searchValue)) ||
          UserService.getUserByEmail(searchValue);
      } else {
        response = await UserService.getUserById(parseInt(searchValue));
      }
      setUsers([response.data]);
    } catch (error) {
      console.error(
        t('userlist.There was an error searching for the user!'),
        error,
      );
    }
  };

  const handleUpdate = (userId: number) => {
    navigate(`/updateUser/${userId}`);
  };

  return (
    <div className="user-list-page">
      <div className="user-list-container">
        <div className="user-list-header">
          <h2>{t('userlist.User List')}</h2>
          <SearchBar onSearch={searchUser} />
        </div>
        <Table className="user-list-table">
          <TableHead>
            <tr>
              <th>{t('userlist.ID')}</th>
              <th>{t('userlist.Username')}</th>
              <th>{t('userlist.Full Name')}</th>
              <th>{t('userlist.Email')}</th>
              <th>{t('userlist.Role')}</th>
              <th>{t('userlist.Action')}</th>
              <th>{t('userlist.Action')}</th>
            </tr>
          </TableHead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (user.userId !== undefined) {
                        handleDelete(user.userId);
                      }
                    }}
                    className="delete-button"
                  >
                    {t('userlist.DELETE')}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (user.userId !== undefined) {
                        handleUpdate(user.userId);
                      }
                    }}
                    className="update-button"
                  >
                    {t('userlist.MODIFY')}
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserList;
