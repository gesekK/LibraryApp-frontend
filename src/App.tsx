import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Login from './components/Login';
import AddUser from './components/users/AddUser';
import UserList from './components/users/UserList';
import AddBook from './components/books/AddBook';
import BookList from './components/books/BookList';
import DeleteBook from './components/books/DeleteBook';
import BorrowBook from './components/loans/BorrowBook';
import LoanHistory from './components/loans/LoanHistory';
import LoanList from './components/loans/LoanList';
import ReturnBook from './components/loans/ReturnBook';
import AddReview from './components/reviews/AddReview';
import ReviewList from './components/reviews/ReviewList';
import UpdateBook from './components/books/UpdateBook';
import UpdateUser from './components/users/UpdateUser';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sidebar />}>
          <Route path="addUser" element={<AddUser />} />
          <Route path="userList" element={<UserList />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="bookList" element={<BookList />} />
          <Route path="deleteBook" element={<DeleteBook />} />
          <Route path="borrowBook" element={<BorrowBook />} />
          <Route path="loanHistory" element={<LoanHistory />} />
          <Route path="loanList" element={<LoanList />} />
          <Route path="returnBook" element={<ReturnBook />} />
          <Route path="addReview" element={<AddReview />} />
          <Route path="reviewList" element={<ReviewList />} />
          <Route path="updateUser" element={<UpdateUser />} />
          <Route path="updateBook" element={<UpdateBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
