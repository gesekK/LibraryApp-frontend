import React, { useEffect, useState } from 'react';
import { Review } from '../../../models/Review';
import ReviewService from '../../../services/ReviewService';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import '../../../styles/ReviewList.css';
import SearchBar from '../../SearchBar';
import { useTranslation } from 'react-i18next';

const ReviewList: React.FC = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewService.getAllReviews();
        setReviews(response.data);
      } catch (error) {
        console.error(t('reviewList.errorFetching'), error);
        setError(t('reviewList.errorFetching'));
      }
    };

    fetchReviews();
  }, [t]);

  const searchReview = async (searchValue: string) => {
    try {
      let response;

      if (isNaN(parseInt(searchValue))) {
        response = await ReviewService.getReviewsForBook(searchValue);
      } else {
        response = await ReviewService.getReviewsByUser(parseInt(searchValue));
      }

      if (Array.isArray(response.data)) {
        setReviews(response.data);
      } else {
        setReviews([response.data]);
      }
    } catch (error) {
      console.error(t('reviewList.errorSearching'), error);
      setError(t('reviewList.errorSearching'));
    }
  };

  return (
    <div className="review-list-page">
      <div className="review-list-container">
        <div className="review-list-header">
          <h2>{t('reviewList.header')}</h2>
          <SearchBar onSearch={searchReview} />
        </div>
        {error && <Typography color="error">{error}</Typography>}
        <Table className="review-list-table">
          <TableHead>
            <TableRow>
              <TableCell>{t('reviewList.bookTitle')}</TableCell>
              <TableCell>{t('reviewList.reviewer')}</TableCell>
              <TableCell>{t('reviewList.comment')}</TableCell>
              <TableCell>{t('reviewList.rating')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.book.title}</TableCell>
                <TableCell>{review.user.fullName}</TableCell>
                <TableCell>{review.comment}</TableCell>
                <TableCell>{review.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReviewList;
