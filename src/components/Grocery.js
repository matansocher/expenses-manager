import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import '../styles/Grocery.css';

export default class Grocery extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };    
  }

  handleDeleteClick = () => {
    this.props.onDeleteClick(this.props.grocery);
  }

  render() {
    let { name } = this.props.grocery;
    return(
      <li className="grocery-wrapper">
        <div className="grocery-wrapper-content">
          <p className="item name">{name}</p>
          <DeleteIcon class="delete-icon" onClick={this.handleDeleteClick} />
        </div>
      </li>
    );
  }
}
