import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Book } from '../../../models/Book';
import BookService from '../../../services/BookService';
import '../../../styles/UpdateBook.css';
import { Button, FormLabel, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UpdateBook: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Book>({
    availableCopies: 0,
    countOfLoans: 0,
    isbn: '',
    publisher: '',
    title: '',
    author: '',
    publishYear: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const response = await BookService.getBookById(Number(id));
          setInitialValues(response.data);
        } catch (error) {
          setError(t('updateBook.errorFetching'));
          console.error(t('updateBook.errorFetching'), error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBook();
  }, [id, t]);

  const validationSchema = Yup.object({
    title: Yup.string().required(t('updateBook.title') + ' ' + t('required')),
    author: Yup.string().required(t('updateBook.author') + ' ' + t('required')),
    publishYear: Yup.number().required(
      t('updateBook.publishYear') + ' ' + t('required'),
    ),
    availableCopies: Yup.number()
      .required(t('updateBook.availableCopies') + ' ' + t('required'))
      .min(0, t('updateBook.availableCopies') + ' ' + t('minValue')),
  });

  const handleSubmit = async (
    values: Book,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await BookService.updateBook(Number(id), values);
      alert(t('updateBook.updateSuccess'));
      navigate('/bookList');
    } catch (error) {
      alert(t('updateBook.errorUpdating'));
      console.error(t('updateBook.errorUpdating'), error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="update-book-page">
      <div className="update-book-container">
        <h2 className="update-book-header">{t('updateBook.header')}</h2>
        {error && <Typography color="error">{error}</Typography>}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="update-book-form">
              <FormLabel htmlFor="isbn">{t('updateBook.isbn')}:</FormLabel>
              <div>
                <Field type="text" name="isbn" />
                <ErrorMessage name="isbn" component="div" className="error" />
              </div>
              <FormLabel htmlFor="title">{t('updateBook.title')}:</FormLabel>
              <div>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <FormLabel htmlFor="author">{t('updateBook.author')}:</FormLabel>
              <div>
                <Field type="text" name="author" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>
              <FormLabel htmlFor="publisher">
                {t('updateBook.publisher')}:
              </FormLabel>
              <div>
                <Field type="text" name="publisher" />
                <ErrorMessage
                  name="publisher"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="publishYear">
                {t('updateBook.publishYear')}:
              </FormLabel>
              <div>
                <Field type="text" name="publishYear" />
                <ErrorMessage
                  name="publishYear"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="availableCopies">
                {t('updateBook.availableCopies')}:
              </FormLabel>
              <div>
                <Field type="number" name="availableCopies" />
                <ErrorMessage
                  name="availableCopies"
                  component="div"
                  className="error"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  t('updateBook.update')
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateBook;
