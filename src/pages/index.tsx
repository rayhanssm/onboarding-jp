import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import { Box, FormControlLabel, Grid, TextField, Typography, FormControl, FormLabel, FormGroup, FormHelperText, Checkbox } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
import Head from 'next/head'

function Register() {
  const formik = useFormik({
    initialValues: {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        isCompany: '',
    }, 
    validationSchema: yup.object().shape({
        email: yup.string().email("Enter unique email").required('Required'),
        name: yup.string().required("Name is required"),
        password: yup.string().required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password')], "Password must be same").required('Required')
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
        <Head>
            <title>Job Portal</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Card sx={{minWidth: '800px', padding:'24px'}}>
            <FormGroup>
                <Typography variant='h4' fontWeight='bold' marginBottom='32px' align='center'>Register</Typography>
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
                    id="name"
                    label="Name" 
                    value={formik.values.name} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                <TextField 
                    id="confirmPassword" 
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword} 
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    sx={{marginBottom: '8px'}} />
                <FormControlLabel control={<Checkbox />} 
                    id="isCompany"
                    label="Register as Company" 
                    value={formik.values.isCompany} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    sx={{marginBottom: '16px'}} />
                <Button variant='contained' size='large' type='submit' color='primary'>Register</Button>
            </FormGroup>
        </Card>
    </Grid>
  )
}

export default Register