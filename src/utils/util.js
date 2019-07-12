export const formatNumber = n => ('0'+n.toString()).slice(-2)

export const formatDate = function (date, format = 'yyyy-MM-dd hh:mm:ss') {
  if (!date) return;
  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()
  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  const rules = {
    yyyy: Y,
    M: M,
    MM: formatNumber(M),
    d: D,
    dd: formatNumber(D),
    h: h,
    hh: formatNumber(h),
    m: m,
    mm: formatNumber(m),
    s: s,
    ss: formatNumber(s)
  }
  const arr = format.split(/-| |:|\//)
  let formatDate = format;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    formatDate = formatDate.replace(el, rules[el])
  }
  return formatDate
}
