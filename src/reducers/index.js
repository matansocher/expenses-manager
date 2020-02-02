import { combineReducers } from 'redux';
import expenses from './reducer_expenses';
import current_expense from './reducer_current_expense';
import groceries from './reducer_groceries';

const rootReducer = combineReducers({
  expenses, current_expense, groceries
});

export default rootReducer;