import axios from 'axios';
import { User } from '../models/User';
import { Loan } from '../models/Loan';

const API_URL = 'http://localhost:8080/user';

class UserService {
  async getAllUsers() {
    return axios.get<User[]>(`${API_URL}/getAll`);
  }

  async getUserById(id: number) {
    return axios.get<User>(`${API_URL}/${id}`);
  }

  async getUserByUsername(username: string) {
    return axios.get<User>(`${API_URL}/username/${username}`);
  }

  async getUserByEmail(email: string) {
    return axios.get<User>(`${API_URL}/email/${email}`);
  }

  async addUser(user: User) {
    return axios.post<User>(`${API_URL}/add`, user);
  }

  async updateUser(id: number, user: User) {
    return axios.put<User>(`${API_URL}/update/all/${id}`, user);
  }

  async deleteUser(id: number) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  async getLoanHistory(userId: number) {
    return axios.get<Loan[]>(`${API_URL}/history/${userId}`);
  }

  async logout() {
    return axios.post(`${API_URL}/logout`);
  }
}

export default new UserService();
