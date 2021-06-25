const formatTimeToYear = (val) => {
  if (val) {
    if (val.toString().length < 13) {
      val = val * 1000
    }
    let time = new Date(val).toLocaleString(undefined, {
      hour12: false
    })
    // 把时间表达式中/改为-
    time = time.split('/').join('-')
    return time
  }
}

export {
  formatTimeToYear,
}