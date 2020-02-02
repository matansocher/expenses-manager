
import { SET_CURRENT_EDIT_EXPENSE, CLEAR_CURRENT_EDIT_EXPENSE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_EDIT_EXPENSE:
      return action.payload;
    case CLEAR_CURRENT_EDIT_EXPENSE:
      return action.payload;
    default:
      return state;
  }
}