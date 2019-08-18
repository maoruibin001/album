
export function isPc () {
  return !(/Android | webOS |iPhone | iPod | BlackBerry/i.test(navigator.userAgent))
}

export function getImageHeightByWidth (url, width, gapHorizontal = 12, gapVertical = 30) {
  return new Promise((resolve, reject) => {
    var img = new Image()
    img.src = url
    if (img.width > 0 || img.height > 0) {
      const height = (width - gapHorizontal) * (img.height / img.width) + gapVertical
      return resolve(height)
    }
    const timer = setInterval(() => {
      if (img.width > 0 || img.height > 0) {
        const height = (width - gapHorizontal) * (img.height / img.width) + gapVertical
        clearInterval(timer)
        return resolve(height)
      }
    }, 30)
  })
}
