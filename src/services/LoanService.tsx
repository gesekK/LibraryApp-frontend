import axios from 'axios';
import { Loan } from '../models/Loan';

const API_URL = 'http://localhost:8080/loan';

class LoanService {
  getToken() {
    return localStorage.getItem('userToken');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }
  async getAllLoans() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Loan[]>(`${API_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getLoanById(id: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Loan>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addLoan(loan: Loan) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.post<Loan>(`${API_URL}/add`, loan, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async borrowBook(userId: number, bookId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    try {
      const response = await axios.post<Loan>(`${API_URL}/borrow`, null, {
        params: { userId, bookId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error in borrowBook:', error);
      throw error;
    }
  }

  async returnBook(loanId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.put(`${API_URL}/return/${loanId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async approveLoan(loanId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.put(`${API_URL}/approve/${loanId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async confirmReturn(loanId: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.put(`${API_URL}/confirm-return/${loanId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getDelayedReturns() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Loan[]>(`${API_URL}/delayed-returns`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new LoanService();
