import { Fragment } from 'react'
import { useState } from "react";

import { Header, ClassroomList } from "../components/components";
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const HomePage = (props) => {
  const [darkMode,setDarkMode] = useState(false);

  const theme = createTheme({
        palette: {
         mode:darkMode?"dark":"light"
        }
      })
  return (
    <ThemeProvider theme={theme}>
    <Paper style={{height:"250vh"}}>
    <Fragment>
      <Header check={darkMode} change={()=>setDarkMode(!darkMode)} />
      <ClassroomList />
    </Fragment>
    </Paper>
  </ThemeProvider>
  );
}

export default HomePage;