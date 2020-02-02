import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default (props) => {
  return (
    <Link to={props.navigateTo} className="plus">
      <ArrowBackIcon />
    </Link>
  )
}