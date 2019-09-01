const prefex = '/api'
export const productApi = {
  add: {
    method: prefex + '/product'
  },
  delete: {
    method: prefex + '/product/:id',
    type: 'delete'
  },
  edit: {
    method: prefex + '/product/:id',
    type: 'put'
  },
  getAll: {
    method: prefex + '/products',
    type: 'get'
  },
  get: {
    method: prefex + '/product/:id',
    type: 'get'
  }
}

export const imgUploadApi = {
  upload: {
    method: prefex + '/upload/image'
  }
}
