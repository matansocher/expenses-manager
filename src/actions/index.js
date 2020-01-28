// import _ from 'lodash';
import { GET_ALL_EXPENSES, SORT_ALL_EXPENSES, ADD_NEW_EXPENSE, EDIT_EXPENSE, DELETE_EXPENSE } from './types';

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

export function addNewExpenses(expense) {
  return {
    type: ADD_NEW_EXPENSE,
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
