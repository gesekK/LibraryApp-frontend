import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const LoginSignup: React.FC = () => {
  const initialValues = {
    login: '',
    password: '',
  };

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    login: Yup.string().required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must have at least 5 characters'),
  });

  const handleSubmit = async (values: { login: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:8080/login', values);
      const token = response.data; // assuming the token is returned in response.data.token
      localStorage.setItem('userToken', token);
      console.log('Response:', response);
      alert('Login successful');
      navigate('/addBook');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="loginPage">
      <div className="container">
        <div className="header">
          <div className="text">Hello there, </div>
          <div className="text2">Welcome to Library System! </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, isValid }) => (
            <Form className="inputs">
              <FormLabel className="username" htmlFor="login">
                Username
              </FormLabel>
              <TextField
                className="input"
                id="login"
                name="login"
                placeholder="Enter your username"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="login" component="div" className="error" />
              <FormLabel className="username" htmlFor="password">
                Password
              </FormLabel>
              <TextField
                className="input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                variant="outlined"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <ErrorMessage name="password" component="div" className="error" />
              <Button
                variant="outlined"
                type="submit"
                className="submit"
                disabled={!isValid}
              >
                Log In
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginSignup;
