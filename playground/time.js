const moment = require('moment');

const date = moment();
date.add(100, 'year').subtract(9, 'months');
console.log(date.format('Do-MMM, YYYY'));
