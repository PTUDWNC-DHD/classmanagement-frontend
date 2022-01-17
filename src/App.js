import { useContext, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import DisplayContext from './contexts/displayContext';

import AppRouter from './routes'



const App = () => {
  const { currentMode } = useContext(DisplayContext);
  

  const appTheme = createTheme({
    palette: {
      mode: currentMode
    }
  })

  useEffect(()=>{
    console.log('current mode: ', currentMode)
  },[currentMode])


  return (
    <ThemeProvider theme={appTheme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
