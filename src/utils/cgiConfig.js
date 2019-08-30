export const productApi = {
  add: {
    method: '/api/product'
  },
  delete: {
    method: '/api/product/:id',
    type: 'delete'
  },
  edit: {
    method: '/api/product/:id',
    type: 'put'
  },
  getAll: {
    method: '/api/products',
    type: 'get'
  },
  get: {
    method: '/api/product/:id',
    type: 'get'
  }
}

export const imgUploadApi = {
  upload: {
    method: '/api/upload/image'
  }
}
