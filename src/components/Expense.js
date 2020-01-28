import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { getIconByCategory } from '../services/common_methods'

import '../styles/Expense.css';

export default class Expense extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.expense);
  }

  render() {
    let { name, date, category, cost, whoPaid } = this.props.expense;
    const dateObj = new Date(date);
    const displayDate = `${dateObj.getDate()}/${dateObj.getMonth()+1}`;
    const categoryIcon = getIconByCategory(category)
    return(
      <li className="expense-wrapper">
        <div className="expense-wrapper-content">
          <p className="item name">{name}</p>
          <p className="item date">{displayDate}</p>
          <p className="item cost">{cost} ₪</p>
          <p className="item whoPaid">{whoPaid}</p>
          <p className="item category">{category}{categoryIcon}</p>
        </div>
        <DeleteIcon className="delete-icon" onClick={this.handleDeleteClick} />
      </li>
    );
  }
}
