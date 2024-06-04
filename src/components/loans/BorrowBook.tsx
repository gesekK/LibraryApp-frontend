import React, { useState } from 'react';
import LoanService from '../../services/LoanService';

const BorrowBook: React.FC = () => {
  const [userId, setUserId] = useState<number | undefined>();
  const [bookId, setBookId] = useState<number | undefined>();

  const handleBorrow = async () => {
    if (userId && bookId) {
      try {
        await LoanService.borrowBook(userId, bookId);
        alert('Book borrowed successfully!');
      } catch (error) {
        console.error('There was an error borrowing the book!', error);
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter user ID"
        onChange={(e) => setUserId(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Enter book ID"
        onChange={(e) => setBookId(Number(e.target.value))}
      />
      <button onClick={handleBorrow}>Borrow Book</button>
    </div>
  );
};

export default BorrowBook;
