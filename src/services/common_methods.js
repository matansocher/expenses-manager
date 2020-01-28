import React from 'react';
import _ from 'lodash';

import HouseIcon from '@material-ui/icons/House';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import WcIcon from '@material-ui/icons/Wc';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import RedditIcon from '@material-ui/icons/Reddit';

export function getRandomId() {
    const numOfChars = 20;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( var i = 0; i < numOfChars; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

export function getPieChartData(expenses, groupByField) {
    const data = [];
    const groupedByField = _.groupBy(expenses, groupByField);
    Object.keys(groupedByField).map(category => {
        let sumForCategory = 0;
        groupedByField[category].map(expense => {
            sumForCategory += parseInt(expense.cost);
        })
        return data.push({ category, sum: sumForCategory });
    })
    return data;
}

export function getIconByCategory(category) {
    switch (category) {
        case 'House (Rent & Bills)': return <HouseIcon style={{ 'color': '#fd635b' }} />;
        case 'Supermarkets': return <ShoppingCartIcon style={{ 'color': '#008254' }} />;
        case 'Restaurants': return <FastfoodIcon style={{ 'color': '#feb544' }} />;
        case 'Health': return <LocalHospitalIcon style={{ 'color': '#82d3e6' }} />;
        case 'Clothes & Accessories ': return <WcIcon style={{ 'color': '#fe8976' }} />;
        case 'Entertainment': return <EmojiEmotionsIcon style={{ 'color': '#513bff' }} />;
        case 'Others': return <RedditIcon style={{ 'color': '#ffeb3b' }} />;
        default: return;
    }
}

export function sortExpenses(expenses, sortBy) {
    return expenses.sort((expenseObj1, expenseObj2) => {
        const term1 = typeof expenseObj1[sortBy] === 'string' ? expenseObj1[sortBy].toUpperCase() : expenseObj1[sortBy];
        const term2 = typeof expenseObj2[sortBy] === 'string' ? expenseObj2[sortBy].toUpperCase() : expenseObj2[sortBy];
        return term1 > term2 ? 1 : -1;
    });
}