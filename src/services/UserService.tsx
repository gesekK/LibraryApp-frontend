import axios from 'axios';
import { User } from '../models/User';
import { Loan } from '../models/Loan';

const API_URL = 'http://localhost:8080/user';

class UserService {
  getToken() {
    return localStorage.getItem('userToken');
  }
  async getAllUsers() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<User[]>(`${API_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserById(id: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<User>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserByUsername(username: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<User>(`${API_URL}/username/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserByEmail(email: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<User>(`${API_URL}/email/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addUser(user: User) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.post<User>(`${API_URL}/add`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async updateUser(id: number, user: User) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.put<User>(`${API_URL}/update/all/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteUser(id: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.delete(`${API_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getLoanHistory(userId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Loan[]>(`${API_URL}/history/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async logout() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.post(`${API_URL}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new UserService();
