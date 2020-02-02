import React, { Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';

import { deleteExpense } from '../services/firebase.service';
import * as actions from '../actions/index';
import Expense from './Expense';

import '../styles/ListOfExpenses.css';

class ListOfExpenses extends Component {

  constructor(props) {
    super(props);
    this.state = {
      add: false,
      gesture: false,
      gestureText: '',
      loading: false
    };
  }

  componentDidMount() {

  }

  deleteExpense = (expense) => {
    this.setState({ loading: true }, async () => {
      await deleteExpense(expense);
      this.props.onDeleteExpense(expense);
      this.setState({ loading: false });
    });
  }

  editExpense = (expense) => {
    this.setState({ loading: true }, async () => {
      this.props.onSetCurrentEditExpense(expense);
      this.props.navigateToRoute('/add-expense');
    });
  }

  renderList = () => {
    const { expenses } = this.props;

    if (!expenses || !expenses.length) {
      return;
    }

    return expenses.map(expense => {
      const key = Math.random();
      return <Expense
        key={key}
        expense={expense}
        onDeleteClick={this.deleteExpense}
        onEditClick={this.editExpense} />
    });
  }

  render() {
    return(
      <div className="list-wrapper">
        { this.renderList() }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.expenses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onDeleteExpense: (expense) => dispatch(actions.deleteExpenses(expense)),
    onSetCurrentEditExpense: (expense) => dispatch(actions.setCurrentEditExpense(expense)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfExpenses);