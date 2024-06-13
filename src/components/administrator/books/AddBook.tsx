import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BookService from '../../../services/BookService';
import { Book } from '../../../models/Book';
import '../../../styles/AddBook.css';
import { Button, FormLabel } from '@mui/material';
import { FormikHelpers } from 'formik';
import { useTranslation } from 'react-i18next';

const AddBook: React.FC = () => {
  const { t } = useTranslation();

  const initialValues: Book = {
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishYear: 0,
    availableCopies: 0,
    countOfLoans: 0,
  };

  const validationSchema = Yup.object({
    isbn: Yup.string().required(t('addBook.validation.isbn.required')),
    title: Yup.string().required(t('addBook.validation.title.required')),
    author: Yup.string().required(t('addBook.validation.author.required')),
    publisher: Yup.string().required(
      t('addBook.validation.publisher.required'),
    ),
    publishYear: Yup.number()
      .min(0, t('addBook.validation.publishYear.min'))
      .required(t('addBook.validation.publishYear.required')),
    availableCopies: Yup.number()
      .min(0, t('addBook.validation.availableCopies.min'))
      .required(t('addBook.validation.availableCopies.required')),
  });

  const handleAddBook = async (
    values: Book,
    { setSubmitting, resetForm }: FormikHelpers<Book>,
  ) => {
    try {
      await BookService.addBook(values);
      alert(t('addBook.addSuccess'));
      resetForm();
    } catch (error) {
      console.error(t('addBook.addError'), error);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-book-page">
      <div className="add-book-container">
        <h1 className="add-book-header">{t('addBook.header')}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddBook}
        >
          {({ isSubmitting }) => (
            <Form className="add-book-form">
              <FormLabel htmlFor="isbn">{t('addBook.isbn')}:</FormLabel>
              <div>
                <Field type="text" name="isbn" />
                <ErrorMessage name="isbn" component="div" className="error" />
              </div>
              <FormLabel htmlFor="title">{t('addBook.title')}:</FormLabel>
              <div>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <FormLabel htmlFor="author">{t('addBook.author')}:</FormLabel>
              <div>
                <Field type="text" name="author" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>
              <FormLabel htmlFor="publisher">
                {t('addBook.publisher')}:
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
                {t('addBook.publishYear')}:
              </FormLabel>
              <div>
                <Field type="number" name="publishYear" />
                <ErrorMessage
                  name="publishYear"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="availableCopies">
                {t('addBook.availableCopies')}:
              </FormLabel>
              <div>
                <Field type="number" name="availableCopies" />
                <ErrorMessage
                  name="availableCopies"
                  component="div"
                  className="error"
                />
              </div>
              <Button
                variant="outlined"
                type="submit"
                className="submit"
                disabled={isSubmitting}
              >
                {t('addBook.submitButton')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBook;
