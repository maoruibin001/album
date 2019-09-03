const prefex = '/api'
export const bSeriesApi = {
  add: {
    method: prefex + '/bseries'
  },
  move: {
    method: prefex + '/bseries/move'
  },
  delete: {
    method: prefex + '/bseries/:bId',
    type: 'delete'
  },
  edit: {
    method: prefex + '/bseries/:bId',
    type: 'put'
  },
  getAll: {
    method: prefex + '/bserieses',
    type: 'get'
  },
  get: {
    method: prefex + '/bseries/:bId',
    type: 'get'
  }
}
export const lSeriesApi = {
  add: {
    method: prefex + '/lseries'
  },
  move: {
    method: prefex + '/lseries/move'
  },
  delete: {
    method: prefex + '/lseries/:lId',
    type: 'delete'
  },
  edit: {
    method: prefex + '/lseries/:lId',
    type: 'put'
  },
  getAll: {
    method: prefex + '/lserieses',
    type: 'get'
  },
  get: {
    method: prefex + '/lseries/:lId',
    type: 'get'
  }
}
export const productApi = {
  add: {
    method: prefex + '/product'
  },
  move: {
    method: prefex + '/product/move'
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
  uploadImg: {
    method: prefex + '/upload/image'
  },
  uploadFile: {
    method: prefex + '/upload/file'
  }
}
