import React, { useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
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
      confirmPassword: '',  // Added re-enter password field
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please re-enter your password'),
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
      <Box
        sx={{
          padding: 4,
          border: '2px solid purple',
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          width: '100%',
          margin: 'auto',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">Register</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Re-enter Password"
            variant="outlined"
            type="password"
            fullWidth
            {...formik.getFieldProps('confirmPassword')}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={{ marginBottom: 2 }}
          />
          {formik.errors.general && (
            <Typography color="error" sx={{ marginBottom: 2 }}>
              {formik.errors.general}
            </Typography>
          )}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ backgroundColor: 'purple', marginBottom: 2, height: 56, fontWeight: 'bold', fontSize: 18 }}
            disabled={formik.isSubmitting}
          >
            Register
          </Button>
        </form>

        <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
          Already have an account?{' '}
          <Link href="/login" color="primary">
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;