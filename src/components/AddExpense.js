import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { addNewExpense } from '../services/firebase.service';
import config from '../config';
import FormInput from './common/FormInput';
import FormInputDate from './common/FormInputDate';
import FormInputDropdown from './common/FormInputDropdown';
import BackBtn from './common/BackBtn';
import Button from '@material-ui/core/Button';

import '../styles/AddExpense.css';

class AddExpense extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cost: '',
      date: new Date(),
      category: '',
      whoPaid: config.whoPaid[0].name,
      loading: false
    };
  }

  handleInputChange = (e) => {
    var change = {};
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
      const expense = { name, cost, date, category, whoPaid };
      await addNewExpense(expense);
      this.setState({ loading: false });
      this.props.onAddNewExpense(expense);
      this.props.history.push('/');
    });
  }

  render() {
    return(
      <div className="container">
        
        {/* {this.state.loading ? <span /> : <span />} */}


        <BackBtn />

        <h1>New Expenese</h1>
        <div className="form">

          <FormInput 
            inputLabel="Origin of Expanse" 
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

        </div>
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
    onAddNewExpense: (expense) => dispatch(actions.addNewExpenses(expense))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddExpense);