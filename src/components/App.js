import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getAllExpenses } from '../services/firebase.service';
import { sortExpenses } from '../services/common_methods';
import ListOfExpenses from './ListOfExpenses';
import FormInputDropdown from './common/FormInputDropdown';
import AddNewFloatingBtn from './common/AddNewFloatingBtn';
import Chart from './common/Chart';
import Loader from './common/Loader';

import '../styles/App.css';
import '../styles/common.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sortBy: 'date'
    }
  }

  async componentDidMount() {
    if (_.isEmpty(this.props.expenses)) {
      this.fetchAllExpenses();
    }
  }

  fetchAllExpenses = () => {
    this.setState({ loading: true }, async () => {
      let allExpenses = await getAllExpenses();
      allExpenses = Object.values(allExpenses.val());
      allExpenses = sortExpenses(allExpenses, this.state.sortBy);
      this.props.onGetAllExpenses(allExpenses);
      this.setState({ loading: false });
    });
  }

  handleInputChange = (e) => {
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change, () => {
      // if (e.target.name === 'sortBy') {
      const sortedExpenses = sortExpenses(this.props.expenses, this.state.sortBy);
      this.props.onSortExpenses(sortedExpenses);
      // }
    });
  }

  render() {
    return (
      <div className="container">
        <AddNewFloatingBtn />
        <h1>My Expenses</h1>

        <FormInputDropdown
            inputLabel="Sort By"
            inputType="text"
            inputName="sortBy"
            inputValue={this.state.sortBy}
            inputWrapperClass="medium-input"
            onInputChange={this.handleInputChange}/>

        {this.state.loading ? <Loader /> : <span />}
        {this.props.expenses.length ? <ListOfExpenses /> : <p>No expenses yet! BOOYAH</p>}
        {this.props.expenses.length ? <Chart header="Expenses by Category" chartType="pie" chartId="chart1" chartDate={this.props.expenses} fieldToGroupBy="category" /> : <span></span>}
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
     onGetAllExpenses: (allExpenses) => dispatch(actions.getAllExpenses(allExpenses)),
     onSortExpenses: (allExpenses) => dispatch(actions.sortExpenses(allExpenses))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);