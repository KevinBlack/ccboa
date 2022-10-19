exports.dataFormat = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
  let dateFormat = require('date-fns/format')
  return dateFormat(new Date(parseInt(time)), format)
}

exports.formatDates = (time, format = 'YYYY-MM-DD') => {
  debugger
  let dateFormat = require('date-fns/format')
  return dateFormat(new Date(time), format)
}

exports.date = (time, format = 'YYYY-MM-DD') => {
  let dateFormat = require('date-fns/format')
  return dateFormat(new Date(parseInt(time)), format)
}

exports.month = (time, format = 'YYYY-MM') => {
  let dateFormat = require('date-fns/format')
  return dateFormat(new Date(parseInt(time)), format)
}

exports.mobile = (mobile) => {
  return String(mobile).replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}


