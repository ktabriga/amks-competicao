import * as R from 'ramda'

const getCurrentId = (params) => {
  if (params.childId) {
    return params.childId
  }
  return params.id
}

export const ListApi = ({api, children, filtersConfig={}, where={}}) => {
  const handleDelete = async (item) => {
    const undo = async () =>  {
      const response = await api.undoRemove(item.id)
      return {ok: response.ok}
    }
    const response = await api.remove(item.id)
    if (response.ok) {
      return {
        ok: true,
        message: 'Item removido. Deseja desfazer alteração?',
        undo
      }
    }
  }

  const getWhereFilter = (filter) => {
    const finalWhere = {...filter, ...where}
    return R.keys(finalWhere)
      .map(key => {
        if (filtersConfig[key]) {
          return {[key]: filtersConfig[key](finalWhere[key])}
        }
        return {[key]: finalWhere[key]}
      })
      .reduce(R.merge, {})
  }

  const getCount = async ({filter}) => {
    const response = await api.getCount({
      where: getWhereFilter(filter)
    })
    if (response.ok) {
      return R.path(['data', 'count'], response)
    }
    return 0
  }

  const getPage = async ({filter={}, ...params}) => {
    const response = await api.getList({
      order: params.order,
      limit: params.rowsPerPage,
      skip: params.rowsPerPage * params.page,
      where: getWhereFilter(filter)
    })
    if (response.ok) {
      return response.data
    }
  }

  return children({handleDelete, getPage, getCount})

}

export const FormApi = ({api, initialData, children, format, submitDecorator, getItemDecorator, match, location, history}) => {
  const handlerApiError = response => {
    switch (response.status) {
      case 409:
        const campos = JSON.parse(response.data.error.message).join(', ')
        return {
          ok: false,
          message: `Campo já foi cadastrado: ${campos}`
        }
      default:
        return {
          ok: false
        }
    }
  }

  const handleSubmit = data => {
    const id = getCurrentId(match.params)
    if (submitDecorator) {
      return submitDecorator({id, data, handleSubmit: handleSubmitForm})
    }
    return handleSubmitForm({id, data})
  }

  const handleSubmitForm = async ({id, data}) => {
    const formated = format ? format(data) : data
    if (/new/.test(id)) {
      const response = await api.create(formated)
      if (response.ok) {
        history.replace(location.pathname.replace(/new$|new-child$/, response.data.id))
        return {ok: true, data: response.data}
      }
      return handlerApiError(response)
    }
    const response = await api.update(id, formated)
    if (response.ok) {
      return {ok: true, data: response.data}
    }
    return handlerApiError(response)
  }


  const getItem = async (filter) => {
    const id = getCurrentId(match.params)
    if (/new/.test(id)) return initialData
    const response = await api.getOne(id, filter)
    if (response.ok) {
      return response.data
    }
    //todo analisar quando der erro
  }

  const getItemProxy = (filter) => {
    if (getItemDecorator) {
      return getItemDecorator({getItem, filter})
    }
    return getItem(filter)
  }
  return children({handleSubmit, getItem: getItemProxy})
}
