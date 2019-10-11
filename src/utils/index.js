
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
  msg = msg || '未知信息'
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

export function wait (promise, time = 2000) {
  const waitPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
  return Promise.all([promise, waitPromise]).then(data => {
    return data[0]
  })
}

// 让一个高频触发的函数在一定时间内只触发一次
export function debounce (fn, gapTime) {
  gapTime = gapTime >> 0
  let timer = null
  let time = Date.now()
  return function () {
    const now = Date.now()
    if (timer && (now - time) < gapTime) {
      clearTimeout(timer)
    }
    time = now
    timer = setTimeout(fn.bind(this, ...arguments), gapTime)
  }
}

/**
* 日期格式化
* @param {Object} date new Date()
* @param {Object} options {formatStr(格式化返回字符串), YSplit(年月日的分隔符), HSplit(时分秒分隔符)}
* @returns {String}
*/
export function formatDate (date, options = {}) {
  const {
    formatStr = 'YMDhm', YSplit, HSplit
  } = options
  date = date || new Date()
  const d = new Date(date)
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')

  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const yRetList = [{
    name: 'Y',
    value: '年',
    link: d.getFullYear()
  },
  {
    name: 'M',
    value: '月',
    link: month
  },
  {
    name: 'D',
    value: '日',
    link: day
  }
  ]
  const hRetList = [{
    name: 'h',
    value: '时',
    link: hours
  },
  {
    name: 'm',
    value: '分',
    link: minutes
  },
  {
    name: 's',
    value: '秒',
    link: seconds
  }
  ]
  const yRets = []
  const hRets = []
  yRetList.forEach(e => {
    if (formatStr.indexOf(e.name) !== -1) {
      yRets.push(e.link, YSplit || e.value)
    }
  })
  hRetList.forEach(e => {
    if (formatStr.indexOf(e.name) !== -1) {
      hRets.push(e.link, HSplit || e.value)
    }
  })

  if (YSplit && yRets.length > 0) {
    yRets.pop()
  }

  if (HSplit && hRets.length > 0) {
    hRets.pop()
  }

  return yRets.length > 0 ? yRets.join('') + ' ' + hRets.join('') : hRets.join('')
}
/**
* 获取当地时间
* @param {Object} date
* @param {string} AP(上午下午) | All(完整)
* @returns {string}
*/

export function getLocalTime (date, flag) {
  date = date || new Date()

  const d = new Date(date)

  let localAP = ''

  const hours = new Date(d).getHours()
  if (hours > 5 && hours < 12) {
    localAP = '早上'
  } else if (hours > 12 && hours < 19) {
    localAP = '下午'
  } else if (hours === 12) {
    localAP = '中午'
  } else {
    localAP = '晚上'
  }

  switch (flag) {
    case 'AP' :
      return localAP
  }
}

export function checkParams (model = {}, checkList = []) {
  for (const item of checkList) {
    console.log(3333)
    if ((!item.type || item.type === 'string') && !model[item.key]) {
      return item.value
    } else if (item.type === 'array' && model[item.key].length < 1) {
      return item.value
    }
  }
  return ''
}

export function setItem (key, data) {
  localStorage.setItem(key, data)
}

export function getItem (key) {
  return localStorage.getItem(key)
}

export function removeItem (key) {
  return localStorage.removeItem(key)
}

export function getUrlParams (key = '') {
  const search = window.location.search
  const params = search.slice(1)
  let paramsList = []
  if (params) {
    paramsList = params.split('&')
  }
  const paramsObj = {}
  paramsList.forEach(e => {
    const item = e.split('=')
    const key = item[0]
    const value = item[1]
    paramsObj[key] = value
  })
  return key ? paramsObj[key] : paramsObj
}
