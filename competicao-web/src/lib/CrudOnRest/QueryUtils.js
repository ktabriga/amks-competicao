import moment from 'moment'

const availablePeriods = ['DAY', 'WEEK', 'MONTH', 'SEMESTER', 'YEAR']
const formatDate = momentDate => momentDate.format('YYYY-MM-DDTHH:mm:ss')

const dateRangeByPeriod = (period, date) => {
  if (!availablePeriods.includes(period)) {
      throw Error(`invalid period ${period}`)
    }
  const start = formatDate(moment(date).startOf('day'))
  const startMonth = formatDate(moment(date).startOf('day').startOf('month'))
  const startSemester = formatDate(moment(date).add(-5, 'M').startOf('day').startOf('month'))
  const startYear = formatDate(moment(date).startOf('day').startOf('year'))

  switch (period) {
      case 'DAY':
        return {
                start,
                end: formatDate(moment(date).endOf('day'))
              }
      case 'WEEK':
        return {
                start,
                end: formatDate(moment(date).endOf('week').endOf('day'))
              }
      case 'MONTH':
        return {
                start: startMonth,
                end: formatDate(moment(date).endOf('month').endOf('day'))
              }
      case 'SEMESTER':
        return {
                start: startSemester,
                end: formatDate(moment(date).endOf('month').endOf('day'))
              }
      case 'YEAR':
        return {
                start: startYear,
                end: formatDate(moment(date).endOf('year').endOf('day'))
              }
    default:
      throw Error('Unkown period')
    }
}


export const loopbackRange = (field, period, date) => {
  const {start, end} =  dateRangeByPeriod(period, date)
  return `filter[where][${field}][between][0]=${start}&filter[where][${field}][between][1]=${end}`
}

export const objectToQueryArgs = params => {
  const queryArgs = Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
  return queryArgs.join('&')
}

