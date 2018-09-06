import moment from 'moment'

/**
 * 格式化过滤器
 * @param r 行
 * @param c 列
 * @param val 值
 */

// 默认显示：'无' 、'未知'、'0'
export const defValFilter1 = (r, c, val) => val || '无'
export const defValFilter2 = (r, c, val) => val || '未知'
export const defValFilter3 = (r, c, val) => val || 0

// 日期格式化
export const dateFilter1 = (r, c, val) => val ? moment(val).format('YYYY-MM-DD') : '无'
export const dateFilter2 = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日') : '无'
export const dateFilter3 = (r, c,val)=> val ? moment(val).format('YYYY.MM.DD') : '无'
export const timeFilter1 = (val, format = 'MM-DD') => val ? moment(val).format(format) : '无'

// 时间格式化
export const timeFilter2 = (r, c,val)=> val ? moment(val).format('HH:mm') : '无'

// 日期时间格式化
export const dateTimeFilter1 = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm') : '无'
export const dateTimeFilter2 = (r, c, val) => val ? moment(val).format('YYYY年MM月DD日 HH:mm') : '无'
export const dateTimeFilter3 = (r, c, val) => val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '无'

// 间隔天数 date 日期时间  val相隔天数
export const diffFilter1 = (date , val) =>  moment(date).add(val,'days').format('YYYY-MM-DD HH:mm:ss')

// 间隔时间
export const diffFilter2 = (val, type = 'days') => {
  const diff = val ? moment(val).diff(Date.now(), type) : 0
  return diff > 0 ? diff : 0
}

// 类型过滤
export const suggestStateFilter = (r, c, val) => ['未解决', '已解决', '暂缓'][val] || '无'