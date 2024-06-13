import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../../../services/UserService';
import { User } from '../../../models/User';
import '../../../styles/AddUser.css';
import { Button, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AddUser: React.FC = () => {
  const { t } = useTranslation();

  const initialValues: User = {
    username: '',
    email: '',
    fullName: '',
    password: '',
    role: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('addUser.usernameRequired')),
    email: Yup.string()
      .email(t('addUser.emailInvalid'))
      .required(t('addUser.emailRequired')),
    fullName: Yup.string().required(t('addUser.fullNameRequired')),
    password: Yup.string().min(5).required(t('addUser.passwordRequired')),
    role: Yup.string()
      .required(t('addUser.roleRequired'))
      .oneOf(
        ['ROLE_READER', 'ROLE_LIBRARY_EMPLOYEE'],
        t('addUser.roleInvalid'),
      ),
  });

  const handleAddUser = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    await UserService.addUser(values);
    alert(t('addUser.userAdded'));
    setSubmitting(false);
  };

  return (
    <div className="add-user-page">
      <div className="add-user-container">
        <h2 className="add-user-header">{t('addUser.header')}</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleAddUser}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormLabel htmlFor="username">{t('addUser.username')}</FormLabel>
              <div>
                <Field type="text" name="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="email">{t('addUser.email')}</FormLabel>
              <div>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <FormLabel htmlFor="fullName">{t('addUser.fullName')}</FormLabel>
              <div>
                <Field type="text" name="fullName" />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="password">{t('addUser.password')}</FormLabel>
              <div>
                <Field type="password" name="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <FormLabel htmlFor="role">{t('addUser.role')}</FormLabel>
              <div>
                <Field type="text" name="role" />
                <ErrorMessage name="role" component="div" className="error" />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {t('addUser.accept')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddUser;
