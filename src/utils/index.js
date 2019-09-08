
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

export function ellipsis (str = '', res = 10) {
  return str.length > res ? str.slice(0, res - 1) + '...' : str
}

export function toast (msg, duration) {
  duration = isNaN(duration) ? 3000 : duration
  var m = document.createElement('div')
  m.innerHTML = msg
  m.style.cssText = 'max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;'
  document.body.appendChild(m)
  setTimeout(function () {
    var d = 0.5
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in'
    m.style.opacity = '0'
    setTimeout(function () { document.body.removeChild(m) }, d * 1000)
  }, duration)
}

export function wait (promise, time = 1000) {
  const waitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
  return Promise.all([promise, waitPromise]).then(data => {
    return data[0]
  })
  // return new Promise((resolve, reject) => {
  //   promise.then(data => {
  //     ret = data
  //     if (isOk) {
  //       return resolve(data)
  //     } else {
  //       isOk = true
  //     }
  //   })
  //   setTimeout(() => {
  //     if (isOk) {
  //       return resolve(ret)
  //     } else {
  //       isOk = true
  //     }
  //   }, time)
  // })
}
