import * as React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

function Title(props) {
  return (
    <Typography component="h1" variant="h5" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;