import React, { Component } from 'react';
import config from '../../config';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class FormInputDropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getOptionsElements = () => {
    const options = this.getOptionsArr(this.props.inputName);
    return options.map(option => {
      const key = Math.random();
      return (
        <option key={key} value={option.name}>
          {option.name}
        </option>
      )
    });
  }
  
  getOptionsArr = (inputName) => {
    switch (inputName) {
      case 'category': return config.categories;
      case 'whoPaid': return config.whoPaid;
      case 'sortBy': return config.sortByFields;
      default: return [];
    }
  }

  render() {
    const { inputLabel, inputName, inputWrapperClass } = this.props;
    return(
      <div className="input-wrapper">
        <label>
          <p className="input-label">{inputLabel}</p>
          <div className={`input-element-wrapper ${inputWrapperClass}`}>
          <FormControl>
            <Select
              native
              value={this.props.inputValue}
              name={inputName}
              onChange={this.props.onInputChange}
            >
              <option value="" />
              {this.getOptionsElements()}
            </Select>
          </FormControl>
          </div>
        </label>

      </div>
    );
  }
}
