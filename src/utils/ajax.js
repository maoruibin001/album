import Vue from 'vue'
export function ajax (params = {}, data) {
  let {
    method,
    type = 'post'
  } = params
  const index = method.indexOf(':')
  if (index !== -1) {
    const varib = method.slice(index + 1)
    method = method.slice(0, index) + data[varib]
  }
  if (type === 'post' || type === 'put') {
    return Vue.http[type](method, data).then(data => {
      debugger
      if (data.retCode === 0) {
        return data
      } else {
        if (data.retCode !== undefined) throw new Error(data)
        return data
      }
    })
  } else {
    return Vue.http[type](method, {
      params: data
    }).then(data => {
      if (data.retCode === 0) {
        return data
      } else {
        if (data.retCode !== undefined) throw new Error(data)
        return data
      }
    })
  }
}
