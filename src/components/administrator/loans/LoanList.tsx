import React, { useEffect, useState } from 'react';
import { Loan } from '../../../models/Loan';
import LoanService from '../../../services/LoanService';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

const LoanList: React.FC = () => {
  const { t } = useTranslation();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await LoanService.getAllLoans();
        setLoans(response.data);
      } catch (error) {
        handleError(error);
      }
    };

    fetchLoans();
  }, [t]);

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      console.error(t('loanList.errorFetching'), error);
      setError(`Error: ${error.response?.data?.message || error.message}`);
    } else {
      console.error(t('loanList.errorFetching'), error);
      setError(t('loanList.errorFetching'));
    }
  };

  const handleConfirm = async (id: number) => {
    try {
      await LoanService.confirmReturn(id);
      setLoans(loans.filter((loan) => loan.loanId !== id));
      alert(t('loanList.confirmSuccess'));
    } catch (error: unknown) {
      handleError(error);
    }
  };

  // @ts-ignore
  return (
    <div className="loan-list-page">
      <div className="loan-list-container">
        <h2 className="loan-list-header">{t('loanList.header')}</h2>
        {error && <Typography color="error">{error}</Typography>}
        <Table className="loan-list-table">
          <TableHead>
            <TableRow>
              <TableCell>{t('loanList.id')}</TableCell>
              <TableCell>{t('loanList.bookTitle')}</TableCell>
              <TableCell>{t('loanList.borrower')}</TableCell>
              <TableCell>{t('loanList.loanDate')}</TableCell>
              <TableCell>{t('loanList.returnDate')}</TableCell>
              <TableCell>{t('loanList.dueDate')}</TableCell>
              <TableCell>{t('loanList.status')}</TableCell>
              <TableCell>{t('loanList.action')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.loanId}>
                <TableCell>{loan.loanId}</TableCell>
                <TableCell>{loan.book.title}</TableCell>
                <TableCell>{loan.user.username}</TableCell>
                <TableCell>{loan.loanDate}</TableCell>
                <TableCell>{loan.returnDate}</TableCell>
                <TableCell>{loan.dueDate}</TableCell>
                <TableCell>{loan.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      if (loan.loanId !== undefined && loan.loanId !== null) {
                        handleConfirm(loan.loanId);
                      } else {
                        console.error('Invalid loanId:', loan.loanId);
                      }
                    }}
                    className="confirm-button"
                    variant="contained"
                    color="primary"
                  >
                    {t('loanList.confirm')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LoanList;
