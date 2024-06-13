import axios from 'axios';
import { Book } from '../models/Book';
import { User } from '../models/User';

const API_URL = 'http://localhost:8080/book';

class BookService {
  getToken() {
    return localStorage.getItem('userToken');
  }

  async getAllBooks() {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Book[]>(`${API_URL}/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getBookById(id: number) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Book>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getBookByTitle(title: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Book>(`${API_URL}/title/${title}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getBookByAuthor(author: string) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.get<Book>(`${API_URL}/author/${author}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async addBook(book: Book) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.post<Book>(`${API_URL}/add`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async deleteBook(id: number) {
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

  async updateBook(id: number, book: Book) {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return axios.put<Book>(`${API_URL}/update/all/${id}`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new BookService();
