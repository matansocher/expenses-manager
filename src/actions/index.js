// import _ from 'lodash';
import { 
  GET_ALL_EXPENSES, 
  SORT_ALL_EXPENSES, 
  ADD_NEW_EXPENSE, 
  EDIT_EXPENSE, 
  DELETE_EXPENSE, 
  SET_CURRENT_EDIT_EXPENSE, 
  CLEAR_CURRENT_EDIT_EXPENSE,
  GET_ALL_GROCERIES,
  ADD_GROCERY, 
  DELETE_GROCERY
} from './types';

export function getAllExpenses(allExpenses) {
  return {
    type: GET_ALL_EXPENSES,
    payload: Object.values(allExpenses)
  }
}

export function sortExpenses(allExpenses) {
  return {
    type: SORT_ALL_EXPENSES,
    payload: Object.values(allExpenses)
  }
}

export function upsertExpense(expense, isEdit) {
  const type = isEdit ? EDIT_EXPENSE : ADD_NEW_EXPENSE;
  return {
    type: type,
    payload: expense
  }
}

export function editExpenses(expense) {
  return {
    type: EDIT_EXPENSE,
    payload: expense
  }
}

export function deleteExpenses(expense) {
  return {
    type: DELETE_EXPENSE,
    payload: expense
  }
}

export function setCurrentEditExpense(expense) {
  return {
    type: SET_CURRENT_EDIT_EXPENSE,
    payload: expense
  }
}

export function clearCurrentEditExpense() {
  return {
    type: CLEAR_CURRENT_EDIT_EXPENSE,
    payload: {}
  }
}

export function getAllGroceries(allGroceries) {
  return {
    type: GET_ALL_GROCERIES,
    payload: Object.values(allGroceries)
  }
}

export function upsertGrocery(grocery) {
  return {
    type: ADD_GROCERY,
    payload: grocery
  }
}

export function deleteGrocery(grocery) {
  return {
    type: DELETE_GROCERY,
    payload: grocery
  }
}