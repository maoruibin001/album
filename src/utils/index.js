export function isPC () {
  return /Android | webOS |iPhone | iPod | BlackBerry/i.test(navigator.userAgent) === false
}
