import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../../services/UserService';
import { User } from '../../models/User';

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await UserService.getUserById(Number(id));
      setUser(response.data);
    };
    fetchUser();
  }, [id]);

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
  });

  const handleUpdateUser = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (user) {
      await UserService.updateUser(user.id!, values);
      alert('MainPage updated successfully');
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      {user && (
        <Formik
          initialValues={user}
          validationSchema={validationSchema}
          onSubmit={handleUpdateUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <label htmlFor="username">Username</label>
                <Field type="text" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Update User
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateUser;
