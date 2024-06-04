import axios from 'axios';
import { Loan } from '../models/Loan';

const API_URL = 'http://localhost:8080/loan';

class LoanService {
  async getAllLoans() {
    return axios.get<Loan[]>(`${API_URL}/getAll`);
  }

  async getLoanById(id: number) {
    return axios.get<Loan>(`${API_URL}/${id}`);
  }

  async addLoan(loan: Loan) {
    return axios.post<Loan>(`${API_URL}/add`, loan);
  }

  async borrowBook(userId: number, bookId: number) {
    return axios.post<Loan>(`${API_URL}/borrow`, null, {
      params: { userId, bookId },
    });
  }

  async returnBook(loanId: number) {
    return axios.put(`${API_URL}/return/${loanId}`);
  }

  async approveLoan(loanId: number) {
    return axios.put(`${API_URL}/approve/${loanId}`);
  }

  async confirmReturn(loanId: number) {
    return axios.put(`${API_URL}/confirm-return/${loanId}`);
  }

  async getDelayedReturns() {
    return axios.get<Loan[]>(`${API_URL}/delayed-returns`);
  }
}

export default new LoanService();
