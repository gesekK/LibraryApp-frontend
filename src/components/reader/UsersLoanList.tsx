import React, { useEffect, useState } from 'react';
import { Loan } from '../../models/Loan';
import LoanService from '../../services/LoanService';
import { Button, Table, TableBody, TableCell, TableHead } from '@mui/material';
import '../../styles/LoanList.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const UsersLoanList: React.FC = () => {
  const { t } = useTranslation();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUserId = (): number | null => {
      const token = localStorage.getItem('userToken');
      console.log(t('UserToken: '), token);

      if (!token) {
        console.error(t('No token found'));
        return null;
      }

      try {
        const decodedToken: { id: number; exp: number } = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          console.error(t('Token has expired'));
          return null;
        }
        return decodedToken.id;
      } catch (error) {
        console.error(t('There was an error decoding the token!'), error);
        return null;
      }
    };

    const fetchAllLoans = async () => {
      try {
        const response = await LoanService.getAllLoans();
        const userId = getCurrentUserId();

        if (!userId) {
          throw new Error(t('User ID not found in token'));
        }

        // Filtrujemy wypożyczenia dla obecnego użytkownika
        const userLoans = response.data.filter(
          (loan: Loan) => loan.user.userId === userId,
        );
        setLoans(userLoans);
      } catch (error) {
        console.error(t('There was an error fetching the loans!'), error);
        setError(t('An error occurred while fetching the loans.'));
      }
    };

    fetchAllLoans();
  }, [t]);

  const handleReturn = async (id: number) => {
    console.log('LoanId: ', id);
    try {
      await LoanService.returnBook(id);
      setLoans(loans.filter((loan) => loan.loanId !== id));
      alert(t('Returned successfully!'));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(t('There was an error returning the book!'), error);
        setError(
          `${t('Error')}: ${error.response?.data?.message || error.message}`,
        );
      } else {
        setError(t('An unknown error occurred.'));
      }
    }
  };

  return (
    <div className="loan-list-page">
      <div className="loan-list-container">
        <h2 className="loan-list-header">{t('My Loan History')}</h2>
        <Table className="loan-list-table">
          <TableHead>
            <tr>
              <th>{t('ID')}</th>
              <th>{t('Book Title')}</th>
              <th>{t('Loan Date')}</th>
              <th>{t('Return Date')}</th>
              <th>{t('Due Date')}</th>
              <th>{t('Status')}</th>
              <th>{t('Action')}</th>
            </tr>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <tr key={loan.loanId}>
                <TableCell>{loan.loanId}</TableCell>
                <TableCell>{loan.book.title}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.returnDate}</TableCell>
                <TableCell>{loan.dueDate}</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>
                  {!loan.returnDate && (
                    <Button
                      onClick={() => {
                        if (loan.loanId !== undefined) {
                          handleReturn(loan.loanId);
                        }
                      }}
                      className="delete-button"
                    >
                      {t('RETURN')}
                    </Button>
                  )}
                </TableCell>
              </tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersLoanList;
