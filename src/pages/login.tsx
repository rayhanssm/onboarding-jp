import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Box, FormControlLabel, Grid, TextField, Typography, FormControl, FormLabel, FormGroup, FormHelperText, Checkbox } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'

function Login() {
    const formik = useFormik({
      initialValues: {
          email: '',
          password: '',
      }, 
      validationSchema: yup.object().shape({
          email: yup.string().email("Enter unique email").required('Required'),
          password: yup.string().required("Password is required"),
      }),
      onSubmit: () => {
  
      },
    });

  return (
    <Grid 
        container
        spacing={0}
        direction= 'column'
        alignItems= 'center'
        justifyContent= 'center'
        sx={{minHeight: '100vh'}}>
        <Card sx={{minWidth: '800px', padding:'24px'}}>
            <FormGroup>
                <Typography variant='h4' fontWeight='bold' marginBottom='32px' align='center'>Login</Typography>
                <TextField 
                    id="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    sx={{marginBottom: '16px'}} />
                <TextField 
                    id="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{marginBottom: '16px'}} />
                <Button variant='contained' size='large' type='submit' color='primary'>Login</Button>
            </FormGroup>
        </Card>
    </Grid>
  )
}

export default Login