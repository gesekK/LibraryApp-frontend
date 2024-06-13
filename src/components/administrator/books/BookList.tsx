import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book } from '../../../models/Book';
import BookService from '../../../services/BookService';
import axios from 'axios';
import '../../../styles/BookList.css';
import SearchBar from '../../SearchBar';
import { Button, TableCell } from '@mui/material';
import { useTranslation } from 'react-i18next';

const BookList: React.FC = () => {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await BookService.getAllBooks();
        setBooks(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(t('bookList.fetchError'), error);
          setError(`Error: ${error.response?.data?.message || error.message}`);
        } else {
          setError(t('bookList.unknownError'));
        }
      }
    };

    fetchBooks();
  }, [t]);

  const searchBook = async (searchValue: string) => {
    try {
      let response;

      if (isNaN(parseInt(searchValue))) {
        response = await BookService.getBookByAuthor(searchValue);
        if (!Array.isArray(response.data) || response.data.length === 0) {
          response = await BookService.getBookByTitle(searchValue);
        }
      } else {
        response = await BookService.getBookById(parseInt(searchValue));
      }

      if (Array.isArray(response.data)) {
        setBooks(response.data);
      } else {
        setBooks([response.data]);
      }
    } catch (error) {
      console.error(t('bookList.searchError'), error);
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await BookService.deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
      alert(t('bookList.deleteSuccess'));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('bookList.deleteError'), error);
        setError(`Error: ${error.response?.data?.message || error.message}`);
      } else {
        setError(t('bookList.unknownError'));
      }
    }
  };

  const handleUpdate = (id: number) => {
    navigate(`/updateBook/${id}`);
  };

  return (
    <div className="book-list-page">
      <div className="book-list-container">
        <div className="book-list-header">
          <h2>{t('bookList.header')}</h2>
          <SearchBar onSearch={searchBook} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <table className="book-list-table">
          <thead>
            <tr>
              <th>{t('bookList.id')}</th>
              <th>{t('bookList.isbn')}</th>
              <th>{t('bookList.title')}</th>
              <th>{t('bookList.author')}</th>
              <th>{t('bookList.publisher')}</th>
              <th>{t('bookList.publishYear')}</th>
              <th>{t('bookList.availableCopies')}</th>
              <th>{t('bookList.countOfLoans')}</th>
              <th>{t('bookList.actions')}</th>
              <th>{t('bookList.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <TableCell>{book.id}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publisher}</TableCell>
                <TableCell>{book.publishYear}</TableCell>
                <TableCell>{book.availableCopies}</TableCell>
                <TableCell>{book.countOfLoans}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (book.id !== undefined) {
                        handleDelete(book.id);
                      }
                    }}
                    className="delete-button"
                  >
                    {t('bookList.delete')}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (book.id !== undefined) {
                        handleUpdate(book.id);
                      }
                    }}
                    className="modify-button"
                  >
                    {t('bookList.modify')}
                  </Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
