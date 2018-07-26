import moment from 'moment'


/**
 * 格式化过滤器
 * @param r 行
 * @param c 列
 * @param val 值
 */

// 默认显示 ‘无’
export const defValFilter01 = (r, c, val) => val || '无'
// 默认值显示 ‘未知’
export const defValFilter02 = (r, c, val) => val || '未知'
// 默认值显示 0
export const defValFilter03 = (r, c, val) => val || 0

// 日期格式化
export const dateFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD') : '无'
export const datenFilter = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日') : '无'
export const TimeFilter = (r, c,val) => val ? moment(val).format('YYYY.MM.DD') : '无'

// 时间格式化
export const timeFilter = (val, format = 'MM-DD') => val ? moment(val).format(format) : '无'
export const dateTimeFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm') : '无'
export const datenTimeFilter = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日 HH:mm') : '无'

// 时间格式化 年月日 时分秒
export const detailTimeFilter = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无'
export const hourTimeFilter = (val) => val ? moment(val).format('HH:mm') : '无'

// 时间间隔天数 date 日期时间   val相隔天数
export const intervalDayFilter = (date , val) =>  moment(date).add(val,'days').format('YYYY-MM-DD HH:mm:ss')

// 时间间隔格式化
export const diffFilter = (val, type = 'days') => {
  const diff = val ? moment(val).diff(Date.now(), type) : 0
  return diff > 0 ? diff : 0
}