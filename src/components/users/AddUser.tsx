import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { User } from '../../models/User';
import '../../styles/AddUser.css';
import { Button, FormLabel } from '@mui/material'; // Import the CSS file

const AddUser: React.FC = () => {
  const initialValues: User = {
    username: '',
    email: '',
    fullName: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    fullName: Yup.string().required('Full name is required'),
    password: Yup.string().min(5).required('Password is required'),
  });

  const handleAddUser = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    await UserService.addUser(values);
    alert('User added successfully');
    setSubmitting(false);
  };

  return (
    <div className="add-user-page">
      <div className="add-user-container">
        <h2 className="add-user-header">Add User</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormLabel htmlFor="username">Username</FormLabel>
              <div>
                <Field type="text" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="email">Email</FormLabel>
              <div>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <div>
                <Field type="text" name="fullName" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="password">Password</FormLabel>
              <div>
                <Field type="text" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                Accept
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
