import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { upsertExpense } from '../services/firebase.service';
import config from '../config';
import FormInput from './common/FormInput';
import FormInputDate from './common/FormInputDate';
import FormInputDropdown from './common/FormInputDropdown';
import BackBtn from './common/BackBtn';
import Loader from './common/Loader';
import Button from '@material-ui/core/Button';

import '../styles/UpsertExpense.css';

class UpsertExpense extends Component {

  constructor(props) {
    super(props);
    const { current_expense } = this.props;
    const currentState = !_.isEmpty(current_expense) ? current_expense : this.getDefaultState();
    this.state = currentState;
    console.log(this.state);
    
  }

  getDefaultState = () => {
    return {
      name: '',
      cost: '',
      date: new Date(),
      category: '',
      whoPaid: config.whoPaid[0].name,
      loading: false
    }
  }

  handleInputChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleDateInputChange = (date) => {
    const dateObj = new Date(date);
    const milliseconds = dateObj.getTime();
    this.setState({ date: milliseconds });
  }

  saveBtnHandler = () => {
    this.setState({ loading: true }, async () => {
      const { name, cost, date, category, whoPaid } = this.state;
      const { current_expense } = this.props;
      const expense = { name, cost, date, category, whoPaid };
      if (current_expense.id) { // check if it is an update - get the id of expense
        expense.id = current_expense.id;
      }
      await upsertExpense(expense);
      const isEdit = !_.isEmpty(current_expense);
      this.props.onUpsertExpense(expense, isEdit);
      this.setState(this.getDefaultState());
      if (isEdit) {
        this.props.history.push('/');
        this.props.onClearCurrentEditExpense();
      }
    });
  }

  render() {
    const isEdit = !_.isEmpty(this.props.current_expense);
    return(
      <div className="container">

        {this.state.loading ? <Loader /> : <span />}

        <BackBtn navigateTo="/" />

        {isEdit ? <h1>Edit Expenese</h1> : <h1>New Expenese</h1>}
        <form id="add-new-form" className="form">

          <FormInput 
            inputLabel="Origin of Expense" 
            inputType="text" 
            inputName="name" 
            inputValue={this.state.name}
            inputWrapperClass="long-input"
            onInputChange={this.handleInputChange}/>

          <FormInput 
            inputLabel="Cost" 
            inputType="number" 
            inputName="cost" 
            inputValue={this.state.cost}
            inputWrapperClass="short-input"
            onInputChange={this.handleInputChange}/>

          <FormInputDate 
            inputLabel="Date" 
            inputType="text" 
            inputName="date"
            inputValue={this.state.date}
            inputWrapperClass="medium-input"
            onInputChange={this.handleDateInputChange}/>

          <FormInputDropdown 
            inputLabel="Category" 
            inputType="text" 
            inputName="category" 
            inputValue={this.state.category}
            inputWrapperClass="medium-input"
            onInputChange={this.handleInputChange}/>

          <FormInputDropdown 
            inputLabel="Who Paid" 
            inputType="text" 
            inputName="whoPaid" 
            inputValue={this.state.whoPaid}
            inputWrapperClass="medium-input"
            onInputChange={this.handleInputChange}/>

          <div className="save-wrapper">
            <Button variant="contained" color="primary" onClick={this.saveBtnHandler}>Save</Button>
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.expenses,
    current_expense: state.current_expense
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpsertExpense: (expense, isEdit) => dispatch(actions.upsertExpense(expense, isEdit)),
    onClearCurrentEditExpense: () => dispatch(actions.clearCurrentEditExpense())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpsertExpense);