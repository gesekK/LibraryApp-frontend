import { Button } from '@mui/material';
import React, { useState } from 'react';
import LoanService from '../../services/LoanService';

const ReturnBook: React.FC = () => {
  const [loanId, setLoanId] = useState<number | undefined>();

  const handleReturn = async () => {
    if (loanId) {
      try {
        await LoanService.returnBook(loanId);
        alert('Book returned successfully!');
      } catch (error) {
        console.error('There was an error returning the book!', error);
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter loan ID"
        onChange={(e) => setLoanId(Number(e.target.value))}
      />
      <Button onClick={handleReturn}>Return Book</Button>
    </div>
  );
};

export default ReturnBook;
