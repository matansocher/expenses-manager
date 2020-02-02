import firebase from './firebase.connection';
import * as commonMethods from './common_methods';

export function getAllExpenses() {
    return firebase.database().ref(`expenses`).once('value', expensesSnapshot => {
        return expensesSnapshot.val() || {};
    });
}

export function upsertExpense(expense) {
    expense.id = expense.id || commonMethods.getRandomId();
    expense.date = new Date(expense.date).getTime();
    return firebase.database().ref(`expenses/${expense.id}`).set(expense);
}

export function deleteExpense(expense) {
    const { id } = expense;
    return firebase.database().ref(`expenses/${id}`).remove();
}

export function getAllGroceries() {
    return firebase.database().ref(`groceries`).once('value', groceriesSnapshot => {
        return groceriesSnapshot.val() || {};
    });
}

export function upsertGrocery(grocery) {
    grocery.id = commonMethods.getRandomId();
    return firebase.database().ref(`groceries/${grocery.id}`).set(grocery);
}

export function deleteGrocery(grocery) {
    const { id } = grocery;
    return firebase.database().ref(`groceries/${id}`).remove();
}