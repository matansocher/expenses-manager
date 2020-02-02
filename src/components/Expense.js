import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getIconByCategory, getDisplayDate, getExpenseBgColorByCategory } from '../services/common_methods'

import '../styles/Expense.css';

export default class Expense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
    this.menuBtnRef = React.createRef();
    
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.expense);
  }

  handleEditClick = () => {
    this.props.onEditClick(this.props.expense);
  }

  menuHandleClick = event => {
    this.menuBtnRef = event.currentTarget;
    this.setState({ isMenuOpen: true });
  };

  handleMenuClose = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    let { name, date, category, cost, whoPaid } = this.props.expense;
    const displayDate = getDisplayDate(date);
    const categoryIcon = getIconByCategory(category);
    // const expsenBgColor = getExpenseBgColorByCategory(category);
    return(
      <li className="expense-wrapper">
        <div className="expense-wrapper-content">
        <div className="expense-wrapper-content-left">
          <p className="item name">{name}</p>
          <p className="item date">{displayDate}</p>
        </div>
        <div className="expense-wrapper-content-right">
          <p className="item cost">{cost} ₪</p>
          <p className="item whoPaid">{whoPaid}</p>
        </div>
          {/* <p className="item category">{categoryIcon}{category}</p> */}
        </div>

        <MoreVertIcon onClick={this.menuHandleClick} />  
        
        <Menu
          // id="simple-menu"
          anchorEl={this.menuBtnRef}
          keepMounted
          open={this.state.isMenuOpen}
          onClose={this.handleMenuClose}>

          <MenuItem onClick={this.handleEditClick}>
            <EditIcon className="menu-icon" />
            Edit
          </MenuItem>

          <MenuItem onClick={this.handleDeleteClick}>
            <DeleteIcon className="menu-icon" />
            Delete
          </MenuItem>

        </Menu>
        
      </li>
    );
  }
}
