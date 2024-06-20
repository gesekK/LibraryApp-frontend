import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/Login.css';
import { useTranslation } from 'react-i18next';

const LoginSignup: React.FC = () => {
  const { t } = useTranslation();
  const initialValues = {
    login: '',
    password: '',
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    login: Yup.string().required(t('login.Username is required')),
    password: Yup.string()
      .required(t('login.Password is required'))
      .min(5, t('login.Password must have at least 5 characters')),
  });

  const handleSubmit = async (values: { login: string; password: string }) => {
    console.log('Form submitted:', values);
    try {
      const response = await axios.post('http://localhost:8080/login', values);
      console.log('Server response:', response);

      const token = response.data; // assuming the token is returned in response.data
      localStorage.setItem('userToken', token);
      alert(t('login.Login successful'));

      // Decode the token to get the role
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded token:', decodedToken); // Check the decoded token in console

      const role = decodedToken.role; // Adjust this based on the actual structure of your token
      console.log('Role:', role);

      // Navigate based on role
      if (role === 'ROLE_LIBRARY_EMPLOYEE') {
        navigate('/admin/bookList');
      } else {
        navigate('/reader/usersBookList');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(
        t('login.Login failed. Please check your credentials and try again.'),
      );
    }
  };

  console.log('Rendering LoginSignup component');

  return (
    <div className="loginPage">
      <div className="login-container">
        <div className="header">
          <div className="text">{t('login.Hello there,')} </div>
          <div className="text2">{t('login.Welcome to Library System!')} </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, isValid }) => (
            <Form className="inputs">
              <FormLabel className="username" htmlFor="login">
                {t('login.Username')}
              </FormLabel>
              <TextField
                className="input"
                id="login"
                name="login"
                placeholder={t('login.Enter your username')}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="login" component="div" className="error" />
              <FormLabel className="username" htmlFor="password">
                {t('login.Password')}
              </FormLabel>
              <TextField
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder={t('login.Enter your password')}
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className="error" />
              <Button
                variant="outlined"
                className="submit"
                disabled={!isValid}
                type="submit"
                onClick={() => console.log('Submit button clicked')}
              >
                {t('login.Log In')}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSignup;
