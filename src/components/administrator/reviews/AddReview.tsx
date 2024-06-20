import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Button, FormLabel } from '@mui/material';
import '../../../styles/AddReview.css';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ReviewService from '../../../services/ReviewService';
import { Review } from '../../../models/Review';
import { Book } from '../../../models/Book';
import { User } from '../../../models/User';

const AddReview: React.FC = () => {
  const { t } = useTranslation();
  const { id: bookId } = useParams<{ id: string }>();

  const getCurrentUserId = (): number | null => {
    const token = localStorage.getItem('userToken');

    if (!token) {
      console.error(t('addReview.No token found'));
      return null;
    }

    try {
      const decodedToken: { id: number; exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        console.error(t('addReview.Token has expired'));
        return null;
      }
      return decodedToken.id;
    } catch (error) {
      console.error(
        t('addReview.There was an error decoding the token!'),
        error,
      );
      return null;
    }
  };

  const handleAddReview = async (values: {
    rating: number;
    comment: string;
  }) => {
    const userId = getCurrentUserId();
    if (!userId) {
      console.error(t('addReview.User not authenticated'));
      return;
    }

    const review: Review = {
      book: { id: parseInt(bookId!, 10) } as Book,
      user: { userId: userId } as User,
      rating: values.rating,
      comment: values.comment,
      reviewDate: new Date().toISOString().split('T')[0], // Today's date
    };

    try {
      await ReviewService.addReview(review);
      console.log('Review submitted successfully');
    } catch (error) {
      console.error('There was an error submitting the review:', error);
    }
  };

  return (
    <div className="add-review-page">
      <div className="add-review-container">
        <h2 className="add-review-header">{t('addReview.header')}</h2>
        <Formik
          initialValues={{
            rating: '',
            comment: '',
          }}
          validationSchema={Yup.object({
            rating: Yup.number()
              .required(t('addReview.rating') + ' ' + t('addReview.required'))
              .min(1, t('addReview.ratingMin'))
              .max(5, t('addReview.ratingMax'))
              .typeError(
                t('addReview.rating') + ' ' + t('addReview.mustBeNumber'),
              ),
            comment: Yup.string(),
          })}
          onSubmit={async (values, { resetForm }) => {
            await handleAddReview({
              rating: parseFloat(values.rating), // Ensure rating is a number
              comment: values.comment,
            });
            resetForm();
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <FormLabel htmlFor="rating">{t('addReview.rating')}:</FormLabel>
              <div>
                <Field
                  id="rating"
                  name="rating"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rating}
                />
                {touched.rating && errors.rating ? (
                  <div>{errors.rating}</div>
                ) : null}
              </div>
              <FormLabel htmlFor="comment">{t('addReview.comment')}:</FormLabel>
              <div>
                <Field
                  id="comment"
                  name="comment"
                  as="textarea"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.comment}
                />
                {touched.comment && errors.comment ? (
                  <div>{errors.comment}</div>
                ) : null}
              </div>
              <Button type="submit">{t('addReview.submitButton')}</Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddReview;
