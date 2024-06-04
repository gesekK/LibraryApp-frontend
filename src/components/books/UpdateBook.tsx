import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Book } from '../../models/Book';
import BookService from '../../services/BookService';
import '../../styles/UpdateBook.css';
import { Button, FormLabel } from '@mui/material'; // Importowanie stylu CSS

const UpdateBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<Book>({
    availableCopies: 0,
    countOfLoans: 0,
    id: 0,
    isbn: '',
    publisher: '',
    title: '',
    author: '',
    publishYear: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        try {
          const response = await BookService.getBookById(Number(id));
          setInitialValues(response.data);
        } catch (error) {
          console.error('There was an error fetching the book!', error);
        }
      }
    };

    fetchBook();
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    publishYear: Yup.number().required('Published Date is required'),
    availableCopies: Yup.number()
      .required('Available copies is required')
      .min(0, 'Available copies must be at least 0'),
  });

  const handleSubmit = async (
    values: Book,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await BookService.updateBook(Number(id), values);
      alert('Book updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('There was an error updating the book!', error);
    }
    setSubmitting(false);
  };

  return (
    <div className="update-book-page">
      <div className="update-book-container">
        <h2 className="update-book-header">Update Book</h2>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="update-book-form">
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
                <Field type="text" name="publishYear" />
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
              <Button type="submit" disabled={isSubmitting}>
                Update Book
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateBook;
