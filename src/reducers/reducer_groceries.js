import _ from 'lodash';
import { GET_ALL_GROCERIES, ADD_GROCERY, DELETE_GROCERY } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_GROCERIES:
      return action.payload;
    case ADD_GROCERY:
      return [...state, action.payload]; // update this logic
    case DELETE_GROCERY:
      return _.remove(state, currentGrocery => currentGrocery.id !== action.payload.id);
    default:
      return state;
  }
}