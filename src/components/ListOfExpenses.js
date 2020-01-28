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

  editGrocery = (grocery) => {
    // this.setState({ loading: true }, () => {
    //   fire.database().ref(this.state.list + "/" + grocery.id).set({
    //     id: grocery.id,
    //     title: grocery.title,
    //     dateAdded: grocery.dateAdded,
    //     amount: grocery.amount
    //   }).then(() => {
    //     setTimeout(() => {
    //       this.setState({ loading: false, gestureText: "מוצר עודכן בהצלחה", gesture: true });
    //     }, 1000);
    //   });
    // });
  }

  deleteExpense = (expense) => {
    this.setState({ loading: true }, async () => {
      await deleteExpense(expense);
      this.props.onDeleteExpense(expense);
      this.setState({ loading: false });
    });
  }

  renderList = () => {
    const { expenses } = this.props;

    if (!expenses || !expenses.length) {
      return;
    }

    return this.props.expenses.map(expense => {
      const key = Math.random();
      return <Expense
        key={key}
        expense={expense}
        onDeleteClick={this.deleteExpense} />
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
    onDeleteExpense: (expense) => dispatch(actions.deleteExpenses(expense))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfExpenses);