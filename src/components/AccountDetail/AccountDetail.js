import { useState, useContext } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2';

import { Container, Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField, Avatar, Typography } from '@mui/material';

import { updateUserAccountInformation } from '../../services/userService'

import AuthContext from '../../contexts/authContext'
import * as Notifications from '../../utils/notifications'
import * as Constant from "../../utils/constant"
import { saveToLocalStorage } from '../../utils/localStorage'


const AccountDetail = ({ 
  canEdit, 
  username,
  fullname, setFullname,
  email, setEmail,
  studentId="", setStudentId,

}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [canChange, setCanChange] = useState(false);

  console.log('curr: ', currentUser)

  const formik = useFormik({
    initialValues: {
      email: email,
      fullname: fullname,
      studentId: studentId
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Required")
        .matches(
          Constant.EMAIL_VALIDATE_REGEX,
          "Please enter a valid email address"
        ),
      fullname: Yup.string()
        .required("Required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleSaveDetail(values)
      setSubmitting(false);
    },
  })

  
  const handleSaveDetail = async (values) => {
    const { email, fullname, studentId } = values;
    
    const result = await updateUserAccountInformation(currentUser.token, fullname, email, studentId)
    if (result.data) {
      console.log('user: ', result)
      setCurrentUser(prev => {
        saveToLocalStorage({
          ...prev, user: {...result.data}
        }, Constant.LOCAL_STORAGE_USER)
        return ({
          ...prev, user: {...result.data}
        })
      })
      
      setFullname(result.data.name);
      setEmail(result.data.email);
      setStudentId(result.data.studentId);
      Swal.fire({
        title: "Success",
        text: Notifications.UPDATE_ACCOUNT_SUCCESS,
        icon: "success",
        button: "Close",
      });
    }
    else if (result.error) {
      Swal.fire({
        title: "Error",
        text: Notifications.UPDATE_ACCOUNT_FAILED,
        icon: "error",
        button: "Close",
      });
    }
    setCanChange(false);
  }
  
  
  return (
    <Container>
      <Card >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar >
              {fullname?.charAt(0)}
            </Avatar>
            {
              canEdit && <Typography
                color="textPrimary"
                gutterBottom
                variant="h5"
              > 
                {username}
              </Typography>
            }
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              {
                (canEdit && canChange) ? <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="fullname"
                  value={formik.values.fullname}
                  onChange={formik.handleChange}
                  helperText={formik.touched.fullname && formik.errors.fullname}
                  error={Boolean(formik.touched.fullname && formik.errors.fullname)}
                />
                :
                <Box sx={{ display: 'flex'}}>
                  <Typography sx={{ mr: 12}}>Full Name:</Typography>
                  <Typography>{fullname}</Typography>
                </Box>
                
              }
            </Grid>
            <Grid item md={6} xs={12} >
              {
                (canEdit && canChange) ? <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  helperText={formik.touched.email && formik.errors.email}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                />
                : 
                <Box sx={{ display: 'flex'}}>
                  <Typography sx={{ mr: 12}}>Email:</Typography>
                  <Typography>{email}</Typography>
                </Box>
              }
              
            </Grid>
            <Grid item md={6} xs={12} >
              {
                (canEdit && canChange && !studentId) ? <TextField
                  required
                  fullWidth
                  label="Student ID"
                  name="studentId"
                  value={formik.values.studentId}
                  onChange={formik.handleChange}
                  helperText={formik.touched.studentId && formik.errors.studentId}
                  error={Boolean(formik.touched.studentId && formik.errors.studentId)}
                />
                : 
                <Box sx={{ display: 'flex'}}>
                  <Typography sx={{ mr: 12}}>Student ID:</Typography>
                  <Typography>{studentId}</Typography>
                </Box>
              }
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          {
            canEdit && (
              canChange ? 
                <Button color="primary" variant="contained" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                  Save details
                </Button>
              :
                <Button color="primary" variant="contained" onClick={()=> setCanChange(true)}>
                  Edit
                </Button>
            )
          }
          
        </Box>
      </Card>
    </Container>
  );
};

export default AccountDetail;