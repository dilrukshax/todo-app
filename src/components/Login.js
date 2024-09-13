import React, { useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      if (login(values.email, values.password)) {
        navigate('/dashboard');
      } else {
        setErrors({ general: 'Invalid email or password' });
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          style={{ marginBottom: '20px' }}
        />
        {formik.errors.general && (
          <Typography color="error" style={{ marginBottom: '10px' }}>
            {formik.errors.general}
          </Typography>
        )}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ backgroundColor: 'purple' }}
          disabled={formik.isSubmitting}
        >
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
