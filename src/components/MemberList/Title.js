import * as React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

function Title(props) {
  return (
    <Typography component="h2" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};

export default Title;