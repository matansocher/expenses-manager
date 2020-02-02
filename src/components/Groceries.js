import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index';
import { getAllGroceries, upsertGrocery, deleteGrocery } from '../services/firebase.service';
import Grocery from './Grocery';
import FormInput from './common/FormInput';
import BackBtn from './common/BackBtn';
import Button from '@material-ui/core/Button';
import Loader from './common/Loader';

import '../styles/App.css';
import '../styles/Groceries.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: ''
    }
  }

  async componentDidMount() {
    if (_.isEmpty(this.props.groceries)) {
      this.fetchAllGroceries();
    }
  }

  fetchAllGroceries = () => {
    this.setState({ loading: true }, async () => {
      let allGroceries = await getAllGroceries();
      if (allGroceries && allGroceries.val && allGroceries.val()) {
        allGroceries = Object.values(allGroceries.val());
      }
      this.props.onGetAllGroceries(allGroceries);
      this.setState({ loading: false });
    });
  }

  saveBtnHandler = () => {
    this.setState({ loading: true }, async () => {
      const { name } = this.state;
      const grocery = { name };
      await upsertGrocery(grocery);
      this.props.onUpsertGrocery(grocery);
      this.setState({ loading: false, name: '' });
    });
  }

  deleteGrocery = (grocery) => {
    this.setState({ loading: true }, async () => {
      await deleteGrocery(grocery);
      this.props.onDeleteGrocery(grocery);
      this.setState({ loading: false });
    });
  }

  handleInputChange = (e) => {
    const change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  navigateToRoute = (route) => {
    this.props.history.push(route);
  }

  renderGroceriesList = () => {
    const { groceries } = this.props;

    if (!groceries || !groceries.length) {
      return;
    }
    return groceries.map(grocery => {
      const key = grocery.id;
      if (key === 'aaa') {
        return;
      }
      return <Grocery
        key={key}
        grocery={grocery}
        onDeleteClick={this.deleteGrocery}
        onEditClick={this.editGrocery} />
    });
  }

  render() {
    return (
      <div className="container">

        <BackBtn navigateTo="/" />

        <h1>My Groceries</h1>

        <FormInput 
          inputLabel="Name" 
          inputType="text" 
          inputName="name" 
          inputValue={this.state.name}
          inputWrapperClass="long-input"
          onInputChange={this.handleInputChange}/>

          <div className="save-wrapper">
            <Button variant="contained" color="primary" onClick={this.saveBtnHandler}>Save</Button>
          </div>

        {this.state.loading ? <Loader /> : <span />}

        <div className="list-wrapper">
          {this.props.groceries.length ? this.renderGroceriesList() : <p>No groceries yet!</p>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    groceries: state.groceries
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetAllGroceries: (allGroceries) => dispatch(actions.getAllGroceries(allGroceries)),
    onUpsertGrocery: (grocery) => dispatch(actions.upsertGrocery(grocery)),
    onDeleteGrocery: (grocery) => dispatch(actions.deleteGrocery(grocery))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);