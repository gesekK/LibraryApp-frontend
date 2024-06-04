import React, { useEffect, useState } from 'react';
import { Book } from '../../models/Book';
import BookService from '../../services/BookService';
import '../../styles/BookList.css';
import Sidebar from '../sidebar/Sidebar';

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BookService.getAllBooks();
        setBooks(response.data);
      } catch (error) {
        console.error('There was an error fetching the books!', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-list-page">
      <div className="book-list-container">
        <h2 className="book-list-header">Book List</h2>
        <table className="book-list-table">
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Publish Year</th>
              <th>Available Copies</th>
              <th>Count Of Loans</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.publishYear}</td>
                <td>{book.availableCopies}</td>
                <td>{book.countOfLoans}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
