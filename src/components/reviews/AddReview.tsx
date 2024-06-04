import React from 'react';
import { Field, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { Review } from '../../models/Review';
import ReviewService from '../../services/ReviewService';
import { Button, FormLabel } from '@mui/material';

const AddReview: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      bookTitle: '',
      userId: '',
      rating: '',
      comment: '',
    },
    validationSchema: Yup.object({
      bookTitle: Yup.string().required('Book title is required'),
      userId: Yup.number()
        .required('MainPage ID is required')
        .typeError('MainPage ID must be a number'),
      rating: Yup.number()
        .required('Rating is required')
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5')
        .typeError('Rating must be a number'),
      comment: Yup.string(),
    }),
    onSubmit: async (values) => {
      const newReview: Review = {
        book: { title: values.bookTitle } as any,
        user: { id: Number(values.userId) } as any,
        rating: Number(values.rating),
        comment: values.comment,
        date: new Date().toISOString(),
      };

      try {
        await ReviewService.addReview(newReview);
        alert('Review added successfully!');
      } catch (error) {
        console.error('There was an error adding the review!', error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div>
        <FormLabel htmlFor="bookTitle">Book Title:</FormLabel>
        <Field
          id="bookTitle"
          name="bookTitle"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bookTitle}
        />
        {formik.touched.bookTitle && formik.errors.bookTitle ? (
          <div>{formik.errors.bookTitle}</div>
        ) : null}
      </div>
      <div>
        <FormLabel htmlFor="userId">User ID:</FormLabel>
        <Field
          id="userId"
          name="userId"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.userId}
        />
        {formik.touched.userId && formik.errors.userId ? (
          <div>{formik.errors.userId}</div>
        ) : null}
      </div>
      <div>
        <FormLabel htmlFor="rating">Rating (1-5):</FormLabel>
        <Field
          id="rating"
          name="rating"
          type="number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.rating}
        />
        {formik.touched.rating && formik.errors.rating ? (
          <div>{formik.errors.rating}</div>
        ) : null}
      </div>
      <div>
        <FormLabel htmlFor="comment">Comment:</FormLabel>
        <Field
          id="comment"
          name="comment"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div>{formik.errors.comment}</div>
        ) : null}
      </div>
      <Button type="submit">Add Review</Button>
    </Form>
  );
};

export default AddReview;
