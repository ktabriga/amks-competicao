import { create } from 'apisauce';
import * as R from 'ramda'

const baseURL = process.env.NODE_ENV === 'production' ? 'http://3.130.204.172:9000/api' : 'http://localhost:3000/api'

const AUTH_HEADER = 'X-Auth-Token'
const api = create({
  baseURL
});


const defaultFilter = {
  where: {
    removed: false
  }
}
const apiCrudFactory = (path, {transformers, urls} = {}) => {
  return {
    getList     : (filter = {}) => api.get(path, {'filter': R.mergeDeepWith(R.join, defaultFilter, filter)}),
    getOne      : async (id, filter) => {
      const response = await api.get(`${path}/${id}`, {filter: filter})
      if (transformers && transformers.getOne) {
        const newData = transformers.getOne(response.data)
        response.data = newData
      }
      return response
    },
    getCount: (filter ={}) => api.get(`${path}/count`, R.mergeDeepWith(R.join, defaultFilter, filter)),
    update      : (id, data)   => api.put(`${path}/${id}`, data),
    create      : data   => {
      const endpoint = urls && urls.post ? urls.post : path
      return api.post(endpoint, data)
    },
    remove      : id     => api.patch(`${path}/${id}`, {removed: true}),
    deleteF     : id     => api.delete(`${path}/${id}`),
    undoRemove  : id     => api.patch(`${path}/${id}`, {removed: false})
  }
}

export const setToken = token => api.setHeader(AUTH_HEADER, token)
export const login = credentials => api.post('Users/login', credentials)
export const atletasApi = apiCrudFactory('atletas')
export const categoriasApi = apiCrudFactory('categorias')
export const escolasApi = apiCrudFactory('escolas')
export const categoriaAtletaApi = apiCrudFactory('categoria-atletas')
export const chaveApi = apiCrudFactory('chaves')
export const resultadoApi = {
  getResultado: (id, params) => api.get(`categorias/${id}/resultado`, {filter: params}),
  ...apiCrudFactory('resultados')
}
