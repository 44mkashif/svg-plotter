import React from 'react';
import Plotter from './Components/Plotter';
import Box from '@material-ui/core/Box';

import './App.css';

const App = () => {
  return (
    <Box className="App" m={5} mb={0}>
      <Plotter />
    </Box>
  );
}
export default App;