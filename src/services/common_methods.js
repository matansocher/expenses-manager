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
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( let i = 0; i < numOfChars; i++ ) {
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
            return sumForCategory += parseInt(expense.cost);
        });
        
        // if (category === 'date') {
        //     category = new Date(category)
        //     console.log(category);
            
        // }
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

export function getExpenseBgColorByCategory(category) {
    switch (category) {
        case 'House (Rent & Bills)': return 'rgba(253,99,91,.1)';
        case 'Supermarkets': return 'rgba(0,130,84,.1)';
        case 'Restaurants': return 'rgba(254,181,68,.1)';
        case 'Health': return 'rgba(130,211,230,.1)';
        case 'Clothes & Accessories ': return 'rgba(254,137,118,.1)';
        case 'Entertainment': return 'rgba(81,59,255,.1)';
        case 'Others': return 'rgba(255,235,59,.1)';
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

export function getDisplayDate(date) {
    const dateObj = new Date(date);
    return `${getMonthStringByMonthIndex(dateObj.getMonth())} ${dateObj.getDate()}`;
}

function getMonthStringByMonthIndex(monthIndex) {
    switch(monthIndex) {
        case 0: return 'Jan';
        case 1: return 'Feb';
        case 2: return 'Mar';
        case 3: return 'Apr';
        case 4: return 'May';
        case 5: return 'Jun';
        case 6: return 'Jul';
        case 7: return 'Aug';
        case 8: return 'Sep';
        case 9: return 'Oct';
        case 10: return 'Nov';
        case 11: return 'Dec';
        default: return '';
    }
}