import _ from 'lodash';
import { GET_ALL_EXPENSES,SORT_ALL_EXPENSES, ADD_NEW_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE } from '../actions/types';

export default function(state = [], action) {
  console.log(action);
  switch (action.type) {
    case GET_ALL_EXPENSES:
      return action.payload;
    case SORT_ALL_EXPENSES:
        return action.payload;
    case ADD_NEW_EXPENSE:
      return [...state, action.payload]; // update this logic
    case EDIT_EXPENSE:
      const indexOfEditedExpense = _.findIndex(state, { id: action.payload.id });
      return state.splice(indexOfEditedExpense, 1, action.payload);
    case DELETE_EXPENSE:
      return _.remove(state, currentExpense => currentExpense.id !== action.payload.id);
    default:
      return state;
  }
}