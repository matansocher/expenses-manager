import firebase from './firebase.connection';
import * as commonMethods from './common_methods';

export function getAllExpenses() {
    return firebase.database().ref(`expenses`).once('value', expensesSnapshot => {
        return expensesSnapshot.val();
    });
}

export function addNewExpense(expense) {
    const id = commonMethods.getRandomId();
    expense.id = id;
    expense.date = new Date(expense.date).getTime();
    return firebase.database().ref(`expenses/${id}`).set(expense);
}

export function deleteExpense(expense) {
    const { id } = expense;
    return firebase.database().ref(`expenses/${id}`).remove();
}