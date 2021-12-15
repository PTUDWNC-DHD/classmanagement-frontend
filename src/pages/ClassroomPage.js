import { Fragment, useState } from 'react'
import { useLocation } from "react-router-dom";

import {Container, Paper, Grid, Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Header, ClassroomDetail, MemberList, Grade, GradeTable} from "../components/components";



const ClassroomPage = (props) => {
  const location = useLocation();
  const [value, setValue] = useState('1');

  const path = location.pathname.split('/')
  const classroomId = path.at(-1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fragment>
      <Header />
      <Box sx={{ width: '100%', typography: 'body1' }} >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' , display: 'flex'}} direction="row" justifyContent="center" alignItems="center">
            <TabList onChange={handleChange} >
              <Tab label="Detail" value="1" />
              <Tab label="Members" value="2" />
              <Tab label="Grade Structure" value="3" />
              <Tab label="Grade" value="4" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <ClassroomDetail classroomId={classroomId}/>
          </TabPanel>

          <TabPanel value="2">
            <Box sx={{ display: 'flex' }}>
              <Box
                component="main"
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[0]
                      : theme.palette.grey[0],
                  flexGrow: 1,
                  height: '100vh',
                  overflow: 'auto',
                }}
              >
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <MemberList classroomId={classroomId}/>
                      </Paper>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value="3">
            <Grade classroomId={classroomId}/> 
          </TabPanel>
          <TabPanel value="4">
            <GradeTable /> 
          </TabPanel>
        </TabContext>
      </Box>
    </Fragment>
  );
}

export default ClassroomPage;