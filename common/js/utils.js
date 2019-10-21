'use strict';

var utils = {
  getMonth: function(str) {
    var month = new Date(str).getMonth()+1;
    var tempMonth = '';

    switch(month) {
      case 1: 
        tempMonth = '一月';
        break;
      case 2:
        tempMonth = '二月';
        break;
      case 3:
        tempMonth = '三月';
        break;
      case 4:
        tempMonth = '四月';
        break;
      case 5:
        tempMonth = '五月';
        break;
      case 6:
        tempMonth = '六月';
        break;
      case 7:
        tempMonth = '七月';
        break;
      case 8:
        tempMonth = '八月';
        break;
      case 9:
        tempMonth = '九月';
        break;
      case 10:
        tempMonth = '十月';
        break; 
      case 11:
        tempMonth = '十一月';
        break;
      case 12:
        tempMonth = '十二月';
        break;
    }
    return {
      currentMonth: tempMonth
    }

  }
};

module.exports = utils;