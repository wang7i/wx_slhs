const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
//提供接口
module.exports = {
    formatDate: formatDate,//格式化日期
    stringToDate: stringToDate,//字符串转日期
    calculateTime: calculateTime//比较时间差
}
/** 
   * 字符串转时间（yyyy-MM-dd HH:mm:ss） 
   * result （分钟） 
   */
function stringToDate(fDate) {
    var fullDate = fDate.split("-");
    return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
}


/** 
     * 格式化日期 
     * @param date 日期 
     * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E 
     * @return 格式化后的金额 
     */
function formatDate(date, format) {
    var v = "";
    if (typeof date == "string" || typeof date != "object") {
        return;
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var weekDay = date.getDay();
    var ms = date.getMilliseconds();
    var weekDayString = "";

    if (weekDay == 1) {
        weekDayString = "星期一";
    } else if (weekDay == 2) {
        weekDayString = "星期二";
    } else if (weekDay == 3) {
        weekDayString = "星期三";
    } else if (weekDay == 4) {
        weekDayString = "星期四";
    } else if (weekDay == 5) {
        weekDayString = "星期五";
    } else if (weekDay == 6) {
        weekDayString = "星期六";
    } else if (weekDay == 7) {
        weekDayString = "星期日";
    }

    v = format;
    //Year 
    v = v.replace(/yyyy/g, year);
    v = v.replace(/YYYY/g, year);
    v = v.replace(/yy/g, (year + "").substring(2, 4));
    v = v.replace(/YY/g, (year + "").substring(2, 4));

    //Month 
    var monthStr = ("0" + month);
    v = v.replace(/MM/g, monthStr.substring(monthStr.length - 2));

    //Day 
    var dayStr = ("0" + day);
    v = v.replace(/dd/g, dayStr.substring(dayStr.length - 2));

    //hour 
    var hourStr = ("0" + hour);
    v = v.replace(/HH/g, hourStr.substring(hourStr.length - 2));
    v = v.replace(/hh/g, hourStr.substring(hourStr.length - 2));

    //minute 
    var minuteStr = ("0" + minute);
    v = v.replace(/mm/g, minuteStr.substring(minuteStr.length - 2));

    //Millisecond 
    v = v.replace(/sss/g, ms);
    v = v.replace(/SSS/g, ms);

    //second 
    var secondStr = ("0" + second);
    v = v.replace(/ss/g, secondStr.substring(secondStr.length - 2));
    v = v.replace(/SS/g, secondStr.substring(secondStr.length - 2));

    //weekDay 
    v = v.replace(/E/g, weekDayString);
    return v;
}
/**
 * 计算两个日期相差几天
 * cusDate 当前时间
 * oriDate  比较时间
 * 返回 正数为cusDate>oriDate
 */
function calculateTime(cusDate, oriDate) {
    var cusTime = cusDate.getTime();
    var oriTime = oriDate.getTime();
    return (cusTime - oriTime) / (1000 * 60 * 60 * 24)
}
