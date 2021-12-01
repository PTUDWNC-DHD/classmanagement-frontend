import { Fragment, useState } from 'react'
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import {Container,Paper,Grid,CssBaseline, Tab, Tabs, Box } from '@mui/material'

import { Header, ClassroomDetail, MemberList, Grade } from "../components/components";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ClassroomPage = (props) => {
  const { classroomId } = useLocation();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Fragment>
      <Header />
      
      <Box sx={{ width: '100%' }}>
        <Box color="success" sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex' }} container direction="row" justifyContent="center" alignItems="center" spacing={5}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Detail" {...a11yProps(0)} />
            <Tab label="Members" {...a11yProps(1)} />
            <Tab label="Grade" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ClassroomDetail classroomId={classroomId}/>
        </TabPanel>

        <TabPanel value={value} index={1}> 
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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

        <TabPanel value={value} index={2}>
          <Grade classroomId={classroomId}/> 
        </TabPanel>

      </Box>
    </Fragment>
    
  );
}

export default ClassroomPage;