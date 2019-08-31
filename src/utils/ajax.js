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
    return Vue.http[type](method, data)
  } else {
    return Vue.http[type](method, {
      params: data
    })
  }
}
