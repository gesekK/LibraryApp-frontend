import React, { useEffect, useState } from 'react';
import { Review } from '../../models/Review';
import ReviewService from '../../services/ReviewService';
import { Table, TableCell, TableHead } from '@mui/material';
import '../../styles/ReviewList.css';

const ReviewList: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ReviewService.getAllReviews();
        setReviews(response.data);
      } catch (error) {
        console.error('There was an error fetching the reviews!', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-list-container">
      <h2 className="review-list-header">Review List</h2>
      <Table className="review-list-table">
        <TableHead>
          <tr>
            <th>Book Title</th>
            <th>Reviewer</th>
            <th>Comment</th>
            <th>Rating</th>
          </tr>
        </TableHead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <TableCell>{review.book.title}</TableCell>
              <TableCell>{review.user.fullName}</TableCell>
              <TableCell>{review.comment}</TableCell>
              <TableCell>{review.rating}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReviewList;
