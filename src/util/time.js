export function getDate(timestamp) {
  let now = new Date(timestamp)
  let y = now.getFullYear()
  let m = now.getMonth()
  let d = now.getDate()
  let h = now.getHours()
  let mm = now.getMinutes()
  let s = now.getSeconds()
  return y + '-' + add(m) + '-' + add(d) + ' ' + add(h) + ':' + add(mm) + ':' + add(s)
}

function add(date) {
  return date < 10 ? '0' + date : date
}
