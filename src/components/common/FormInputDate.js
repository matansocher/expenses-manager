import React, { Component } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default class FormInputDate extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { inputLabel, inputName, inputWrapperClass, inputValue, onInputChange } = this.props;
    return(
      <div className="input-wrapper">
        <label>
          <p className="input-label">{inputLabel}</p>
          <div className={`input-element-wrapper ${inputWrapperClass}`}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justify="space-around">
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  name={inputName}
                  value={inputValue}
                  onChange={onInputChange}
                  autoOk
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
        </label>

      </div>
    );
  }
}
