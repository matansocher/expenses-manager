import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default () => {
  return (
    <Link to="/" className="plus">
      <ArrowBackIcon />
    </Link>
  )
}