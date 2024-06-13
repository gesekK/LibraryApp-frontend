// src/components/AddReview.tsx
import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Button, FormLabel } from '@mui/material';
import '../../../styles/AddReview.css';

const AddReview: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="add-review-page">
      <div className="add-review-container">
        <h2 className="add-review-header">{t('addReview.header')}</h2>
        <Formik
          initialValues={{
            bookTitle: '',
            userId: '',
            rating: '',
            comment: '',
          }}
          validationSchema={Yup.object({
            bookTitle: Yup.string().required(
              t('addReview.bookTitle') + ' ' + t('addReview.required'),
            ),
            userId: Yup.number()
              .required(t('addReview.userId') + ' ' + t('addReview.required'))
              .typeError(
                t('addReview.userId') + ' ' + t('addReview.mustBeNumber'),
              ),
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
            // Submit form logic here
          }}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <FormLabel htmlFor="bookTitle">
                {t('addReview.bookTitle')}:
              </FormLabel>
              <div>
                <Field
                  id="bookTitle"
                  name="bookTitle"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bookTitle}
                />
                {touched.bookTitle && errors.bookTitle ? (
                  <div>{errors.bookTitle}</div>
                ) : null}
              </div>
              <FormLabel htmlFor="userId">{t('addReview.userId')}:</FormLabel>
              <div>
                <Field
                  id="userId"
                  name="userId"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userId}
                />
                {touched.userId && errors.userId ? (
                  <div>{errors.userId}</div>
                ) : null}
              </div>
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
