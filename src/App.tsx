import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/Login';
import AddUser from './components/administrator/users/AddUser';
import UserList from './components/administrator/users/UserList';
import AddBook from './components/administrator/books/AddBook';
import BookList from './components/administrator/books/BookList';
import LoanHistory from './components/administrator/loans/LoanHistory';
import LoanList from './components/administrator/loans/LoanList';
import AddReview from './components/administrator/reviews/AddReview';
import ReviewList from './components/administrator/reviews/ReviewList';
import UpdateBook from './components/administrator/books/UpdateBook';
import UpdateUser from './components/administrator/users/UpdateUser';
import MainPage from './components/MainPage';
import HomePage from './components/HomePage';
import UsersBookList from './components/reader/UsersBookList';
import UsersLoanList from './components/reader/UsersLoanList';
import LanguageSwitcher from './components/LanguageSwitcher';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Sidebar />}>
            <Route path="addUser" element={<AddUser />} />
            <Route path="userList" element={<UserList />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="bookList" element={<BookList />} />
            <Route path="loanHistory" element={<LoanHistory />} />
            <Route path="loanList" element={<LoanList />} />
            <Route path="addReview/:id" element={<AddReview />} />
            <Route path="reviewList" element={<ReviewList />} />
            <Route path="updateUser/:id" element={<UpdateUser />} />
            <Route path="updateBook/:id" element={<UpdateBook />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
