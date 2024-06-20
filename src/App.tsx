import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeSidebar from './components/sidebar/Sidebar';
import ReaderSidebar from './components/sidebar/UserSidebar';
import LoginSignup from './components/Login';
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
import HomePage from './components/HomePage';
import UsersBookList from './components/reader/UsersBookList';
import UsersLoanList from './components/reader/UsersLoanList';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { jwtDecode } from 'jwt-decode';
import UserSidebar from './components/sidebar/UserSidebar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user role from localStorage or API after login
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role; // Adjust this based on your actual token structure
      setUserRole(role);
    } else {
      setUserRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUserRole(''); // Wyczyść rolę użytkownika
    window.location.href = '/login'; // Użyj window.location do przejścia do /login
  };

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route
            path="/admin/*"
            element={
              userRole === 'ROLE_LIBRARY_EMPLOYEE' ? (
                <Sidebar />
              ) : (
                <Navigate to="/reader/usersBookList" />
              )
            }
          >
            <Route path="addUser" element={<AddUser />} />
            <Route path="userList" element={<UserList />} />
            <Route path="addBook" element={<AddBook />} />
            <Route path="bookList" element={<BookList />} />
            <Route path="loanHistory" element={<LoanHistory />} />
            <Route path="loanList" element={<LoanList />} />
            <Route path="reviewList" element={<ReviewList />} />
            <Route path="updateUser/:id" element={<UpdateUser />} />
            <Route path="updateBook/:id" element={<UpdateBook />} />
          </Route>
          <Route
            path="/reader/*"
            element={
              userRole === 'ROLE_READER' ? (
                <UserSidebar />
              ) : (
                <Navigate to="/admin/bookList" />
              )
            }
          >
            <Route path="usersBookList" element={<UsersBookList />} />
            <Route path="usersLoanList" element={<UsersLoanList />} />
            <Route path="reviewList" element={<ReviewList />} />
            <Route path="addReview/:id" element={<AddReview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
