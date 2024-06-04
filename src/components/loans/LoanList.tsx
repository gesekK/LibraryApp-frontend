import React, { useEffect, useState } from 'react';
import { Loan } from '../../models/Loan';
import LoanService from '../../services/LoanService';
import { Table, TableBody, TableCell, TableHead } from '@mui/material';
import '../../styles/LoanList.css';

const LoanList: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await LoanService.getAllLoans();
        setLoans(response.data);
      } catch (error) {
        console.error('There was an error fetching the loans!', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loan-list-page">
      <div className="loan-list-container">
        <h2 className="loan-list-header">Loan List</h2>
        <Table className="loan-list-table">
          <TableHead>
            <tr>
              <th>Book Title</th>
              <th>Borrower</th>
              <th>Loan Date</th>
              <th>Return Date</th>
            </tr>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <TableCell>{loan.book.title}</TableCell>
                <TableCell>{loan.user.username}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>
                  {loan.returnDate ? loan.returnDate : 'Not returned'}
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoanList;
