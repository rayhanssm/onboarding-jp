import React from 'react'
import { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
// import { DatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Box, FormControlLabel, Grid, TextField, Typography, FormControl, FormLabel, FormGroup, FormHelperText, Checkbox } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link';


function CreateJob() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            openDate: '',
            closeDate: '',
        }, 
        validationSchema: yup.object().shape({
            title: yup.string().required("Title is required"),
            description: yup.string().required("Description is required"),
            
        }),
        onSubmit: () => {
    
        },
      });

    const [date, setDate] = useState(null);

    const handleChange = () => {
        setDate(date);
    }

  return (
    <>
    <Box sx={{flexGrow: 1}}>
        <AppBar position='static'>
            <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
                <Button color="inherit" component={Link} href='/job-list'>Jobs</Button>
                <Button color="inherit" component={Link} href='/hhh'>Applications</Button>
            </Box>
            <Button variant="contained" color="error" component={Link} href='/'>Logout</Button>
            </Toolbar>
        </AppBar>
    </Box>
        <Card sx={{minWidth: '800px', padding:'24px'}}>
            <FormGroup>
                <Typography variant='h4' fontWeight='bold' marginBottom='32px' align='center'>Add Job</Typography>
                <TextField 
                    id="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    sx={{marginBottom: '16px'}} />
                <TextField 
                    id="description"
                    label="Description" 
                    multiline
                    rows={4}
                    maxRows={10}
                    value={formik.values.description} 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{marginBottom: '16px'}} />
                    <DatePicker
                        label="Open Date"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                        label="Close Date"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                <Button variant='contained' size='large' type='submit' color='primary'>Create</Button>
            </FormGroup>
        </Card>
    </>
  )
}

export default CreateJob