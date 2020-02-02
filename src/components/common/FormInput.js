import React, { Component } from 'react';

export default class FormInput extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { inputLabel, inputType, inputName, inputValue, inputWrapperClass } = this.props;
    return(
      <div className="input-wrapper">
        <label>
          <p className="input-label">{inputLabel}</p>
          <div className={`input-element-wrapper ${inputWrapperClass}`}>
            <input type={inputType} name={inputName} onChange={this.props.onInputChange} value={inputValue} />
            {this.props.inputName === 'cost' ? <p>₪</p> : <span />}
          </div>
        </label>

      </div>
    );
  }
}