import { combineReducers } from 'redux';
import expenses from './reducer_expenses';

const rootReducer = combineReducers({
  expenses
});

export default rootReducer;