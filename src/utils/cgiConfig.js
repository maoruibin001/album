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
  getSome: {
    method: prefex + '/someBserieses',
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
  getSome: {
    method: prefex + '/someLserieses',
    type: 'get'
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
  getSome: {
    method: prefex + '/someProducts',
    type: 'get'
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

export const userApi = {
  login: {
    method: prefex + '/login'
  },
  add: {
    method: prefex + '/user'
  },
  put: {
    method: prefex + '/user',
    type: 'put'
  },
  delete: {
    method: prefex + '/user',
    type: 'delete'
  },
  get: {
    method: prefex + '/user',
    type: 'get'
  }
}

export const accountApi = {
  getUserInfo: {
    method: prefex + '/userInfo',
    type: 'get'
  }
}

export const collectionApi = {
  add: {
    method: prefex + '/collection'
  },
  deleteCollection: {
    method: prefex + '/deleteCollection'
  },
  getAll: {
    method: prefex + '/collections',
    type: 'get'
  }
}

export const littleProgramApi = {
  add: {
    method: prefex + '/littleProgram'
  },
  put: {
    method: prefex + '/littleProgram/:id',
    type: 'put'
  },
  delete: {
    method: prefex + '/littleProgram',
    type: 'delete'
  },
  get: {
    method: prefex + '/littleProgram',
    type: 'get'
  }
}
