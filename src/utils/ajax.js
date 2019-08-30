import Vue from 'vue'
export function ajax (params = {}, data) {
  let { method, type = 'post' } = params
  const index = method.indexOf(':')
  if (index !== -1) {
    const varib = method.slice(index + 1)
    method = method.slice(0, index) + data[varib]
  }
  if (type === 'post') {
    return Vue.http.post(method, data)
  } else if (type === 'get') {
    return Vue.http.get(method, {
      params: data
    })
  } else if (type === 'put') {
    return Vue.http.put(method, {
      params: data
    })
  } else if (type === 'delete') {
    return Vue.http.delete(method, {
      params: data
    })
  }
}
