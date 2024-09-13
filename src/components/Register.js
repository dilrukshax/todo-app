import React, { useContext } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AuthContext from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      if (register(values.name, values.email, values.password)) {
        navigate('/login');
      } else {
        setErrors({ general: 'Email is already registered' });
        setSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="xs" sx={{ marginTop: 8 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          {...formik.getFieldProps('name')}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          style={{ marginBottom: '20px' }}
        />
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
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Register;
