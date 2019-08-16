export const ApiError = ({data, problem}) => {
  const error = Error(data ? data.message : 'Api Error')
  error.data = data
  error.problem = problem
  return error
}

export const toResponsePayload = response =>
    response.ok ? response.data : ApiError(response)
