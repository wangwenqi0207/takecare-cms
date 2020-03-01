/**
 * 获取当前时区
 *
 *
*/

export const offset = function() {
  var nowTime = new Date()
  var offset1 = nowTime.getTimezoneOffset() / 60
  // if (offset1 > 0) {
  //   return -offset1
  // } else {
  //   return offset1
  // }
  return -offset1
}
