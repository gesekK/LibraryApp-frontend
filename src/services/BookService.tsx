import axios from 'axios';
import { Book } from '../models/Book';

const API_URL = 'http://localhost:8080/book';

class BookService {
  async getAllBooks() {
    return axios.get<Book[]>(`${API_URL}/getAll`);
  }

  async getBookById(id: number) {
    return axios.get<Book>(`${API_URL}/${id}`);
  }

  async addBook(book: Book) {
    return axios.post<Book>(`${API_URL}/add`, book);
  }

  async deleteBook(id: number) {
    return axios.delete(`${API_URL}/delete/${id}`);
  }

  async updateBook(id: number, book: Book) {
    return axios.put<Book>(`${API_URL}/update/all/${id}`, book);
  }
}

export default new BookService();
