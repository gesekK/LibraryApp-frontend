import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import BookService from '../../services/BookService';
import { Book } from '../../models/Book';
import '../../styles/AddBook.css';
import { Button, FormLabel } from '@mui/material';
import { FormikHelpers } from 'formik';
import Sidebar from '../sidebar/Sidebar';

const AddBook: React.FC = () => {
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
    isbn: Yup.string().required('ISBN is required'),
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    publisher: Yup.string().required('Publisher is required'),
    publishYear: Yup.number()
      .min(0, 'Publish year must be at least 0')
      .required('Published Year is required'),
    availableCopies: Yup.number()
      .min(0, 'Available copies must be at least 0')
      .required('Available copies are required'),
  });

  const handleAddBook = async (
    values: Book,
    { setSubmitting, resetForm }: FormikHelpers<Book>,
  ) => {
    try {
      await BookService.addBook(values);
      alert('Book added successfully!');
      resetForm();
    } catch (error) {
      console.error('There was an error adding the book!', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="add-book-page">
      <div className="add-book-container">
        <h1 className="add-book-header">Add Book</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddBook}
        >
          {({ isSubmitting }) => (
            <Form className="add-book-form">
              <FormLabel htmlFor="isbn">ISBN:</FormLabel>
              <div>
                <Field type="text" name="isbn" />
                <ErrorMessage name="isbn" component="div" className="error" />
              </div>
              <FormLabel htmlFor="title">Title:</FormLabel>
              <div>
                <Field type="text" name="title" />
                <ErrorMessage name="title" component="div" className="error" />
              </div>
              <FormLabel htmlFor="author">Author:</FormLabel>
              <div>
                <Field type="text" name="author" />
                <ErrorMessage name="author" component="div" className="error" />
              </div>
              <FormLabel htmlFor="publisher">Publisher:</FormLabel>
              <div>
                <Field type="text" name="publisher" />
                <ErrorMessage
                  name="publisher"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="publishYear">Published Year:</FormLabel>
              <div>
                <Field type="number" name="publishYear" />
                <ErrorMessage
                  name="publishYear"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="availableCopies">Available Copies:</FormLabel>
              <div>
                <Field type="number" name="availableCopies" />
                <ErrorMessage
                  name="availableCopies"
                  component="div"
                  className="error"
                />
              </div>
              <Button variant="outlined" type="submit" className="submit">
                Accept
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddBook;
