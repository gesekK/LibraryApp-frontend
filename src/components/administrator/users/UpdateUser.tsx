import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import UserService from '../../../services/UserService';
import { User } from '../../../models/User';
import '../../../styles/UpdateUser.css';
import { Button, FormLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.getUserById(Number(id));
        setUser(response.data);
      } catch (error) {
        console.error(t('updateUser.updateError'), error);
      }
    };
    fetchUser();
  }, [id, t]);

  const validationSchema = Yup.object({
    username: Yup.string(),
    email: Yup.string().email(t('updateUser.emailInvalid')),
    fullName: Yup.string(),
    password: Yup.string().min(5, t('updateUser.passwordMin')),
    role: Yup.string().oneOf(
      ['ROLE_READER', 'ROLE_LIBRARY_EMPLOYEE'],
      t('updateUser.roleInvalid'),
    ),
  });

  const handleSubmit = async (
    values: User,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    try {
      await UserService.updateUser(Number(id), values);
      alert(t('updateUser.updateSuccess'));
      navigate('/userList');
    } catch (error) {
      console.error(t('updateUser.updateError'), error);
    }
    setSubmitting(false);
  };

  return (
    <div className="update-user-page">
      <div className="update-user-container">
        <h2 className="update-user-header">{t('updateUser.header')}</h2>
        {user && (
          <Formik
            initialValues={user}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <FormLabel htmlFor="username">
                  {t('updateUser.username')}
                </FormLabel>
                <div>
                  <Field type="text" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>
                <FormLabel htmlFor="email">{t('updateUser.email')}</FormLabel>
                <div>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <FormLabel htmlFor="fullName">
                  {t('updateUser.fullName')}
                </FormLabel>
                <div>
                  <Field type="text" name="fullName" />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="error"
                  />
                </div>
                <FormLabel htmlFor="password">
                  {t('updateUser.password')}
                </FormLabel>
                <div>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>
                <FormLabel htmlFor="role">{t('updateUser.role')}</FormLabel>
                <div>
                  <Field type="text" name="role" />
                  <ErrorMessage name="role" component="div" className="error" />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {t('updateUser.saveChanges')}
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default UpdateUser;
