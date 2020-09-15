import Vue from 'vue'
function dateFilter(inputDate) {
  const withZeros = (number, length) => {
    let str = number.toString()
    while (str.length < length) {
      str = '0' + str
    }
    return str
  }
  const months = "January February March April May June July August September October November December".split(' ')
  const date = new Date(inputDate);
  const year = withZeros(date.getFullYear(), 2);
  const month = date.getMonth();
  const day = withZeros(date.getDate(), 2);
  const formattedDate = day + " " + months[month] + " " + year;
  const hours = withZeros(date.getHours(), 2);
  const minutes = withZeros(date.getMinutes(), 2);
  const formattedTime = hours + ':' + minutes;
  return formattedDate + ' ' + formattedTime;
}
Vue.filter('date', dateFilter)
