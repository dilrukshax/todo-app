import React, { useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';
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
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold" >Login</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              marginBottom: 2, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'purple',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'purple',
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            {...formik.getFieldProps('password')}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              marginBottom: 2, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'purple',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'purple',
              },
            }}
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
            Login
          </Button>
        </form>

        <Typography align="center" variant="body2" sx={{ marginTop: 2 }}>
          Don't have an account?{' '}
          <Link href="/register" color="#800080">
            Register
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;