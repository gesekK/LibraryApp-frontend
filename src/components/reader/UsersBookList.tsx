import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Book } from '../../models/Book';
import BookService from '../../services/BookService';
import axios from 'axios';
import '../../styles/BookList.css';
import SearchBar from '../SearchBar';
import { Button, TableCell } from '@mui/material';
import LoanService from '../../services/LoanService';
import { jwtDecode } from 'jwt-decode';

const UsersBookList: React.FC = () => {
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
          console.error(
            t('usersBookList.There was an error fetching the books!'),
            error,
          );
          setError(
            `${t('usersBookList.Error')}: ${error.response?.data?.message || error.message}`,
          );
        } else {
          setError(t('usersBookList.An unknown error occurred.'));
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
      console.error(
        t('usersBookList.There was an error searching for the book!'),
        error,
      );
    }
  };

  const getCurrentUserId = (): number | null => {
    const token = localStorage.getItem('userToken');
    console.log('UserToken: ', token);

    if (!token) {
      console.error(t('usersBookList.No token found'));
      return null;
    }

    try {
      const decodedToken: { id: number; exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        console.error(t('usersBookList.Token has expired'));
        return null;
      }
      return decodedToken.id;
    } catch (error) {
      console.error(
        t('usersBookList.There was an error decoding the token!'),
        error,
      );
      return null;
    }
  };

  const handleBorrow = async (bookId: number) => {
    console.log('usersBookList.BookId: ', bookId);
    try {
      const userId = getCurrentUserId();
      console.log('usersBookList.UserId: ', userId);

      if (!userId) {
        throw new Error(
          t(
            'usersBookList.User not authenticated. Please log in to borrow books.',
          ),
        );
      }

      await LoanService.borrowBook(userId, bookId);
      console.log(t('usersBookList.Book borrowed successfully!'));
    } catch (error) {
      console.error(
        t('usersBookList.There was an error borrowing the book!'),
        error,
      );
      setError(
        t(
          'usersBookList.User not authenticated. Please log in to borrow books.',
        ),
      );
    }
  };
  const handleReview = (id: number) => {
    console.log('Book id: ', id);
    navigate(`/reader/addReview/${id}`);
  };

  return (
    <div className="book-list-page">
      <div className="book-list-container">
        <div className="book-list-header">
          <h2>{t('usersBookList.Book List')}</h2>
          <SearchBar onSearch={searchBook} />
        </div>
        {error && <p className="error-message">{error}</p>}
        <table className="book-list-table">
          <thead>
            <tr>
              <th>{t('usersBookList.ID')}</th>
              <th>{t('usersBookList.ISBN')}</th>
              <th>{t('usersBookList.Title')}</th>
              <th>{t('usersBookList.Author')}</th>
              <th>{t('usersBookList.Publisher')}</th>
              <th>{t('usersBookList.Publish Year')}</th>
              <th>{t('usersBookList.Available Copies')}</th>
              <th>{t('usersBookList.Count Of Loans')}</th>
              <th>{t('usersBookList.Actions')}</th>
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
                <TableCell>
                  <Button
                    onClick={() => book.id && handleBorrow(book.id)}
                    className="borrow-button"
                  >
                    {t('usersBookList.BORROW')}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => book.id && handleReview(book.id)}
                    className="borrow-button"
                  >
                    {t('usersBookList.REVIEW')}
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

export default UsersBookList;
