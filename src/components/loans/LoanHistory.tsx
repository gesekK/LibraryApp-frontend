import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserService from '../../services/UserService';
import { Loan } from '../../models/Loan';

const LoanHistory: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoanHistory = async () => {
      const response = await UserService.getLoanHistory(Number(userId));
      setLoans(response.data);
    };
    fetchLoanHistory();
  }, [userId]);

  return (
    <div>
      <h2>Loan History</h2>
      <ul>
        {loans.map((loan) => (
          <li key={loan.id}>
            Book: {loan.book.title} - Borrowed on: {loan.loanDate} - Returned
            on: {loan.returned ? loan.returnDate : 'Not returned yet'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoanHistory;
