const required = (keys, params) => {
  errors = []
  validParams = {}
  
  keys.forEach(key => {
    if (!params[key]) errors.push({ [key]: `${key} is required` })
    else validParams[key] = params[key]
  })

  if (errors.length) throw new Error(JSON.stringify(errors))
  else return validParams
}

const optional = (keys, params, option) => {
  validParams = {}
  errMsg = {
    message: `need ${option} one of the following keys provided: ${keys.join(', ')}`
  }

  keys.forEach(key => {
    if (params[key]) validParams[key] = params[key]
  })

  if (
    (option==='min' && objSize(validParams) < 1) ||
    (option==='max' && objSize(validParams) > 1) ||
    (option==='only' && objSize(validParams) !== 1)
  ) throw new Error(JSON.stringify(errMsg))
  else return validParams
}

const objSize = (obj) => {
  return Object.keys(obj).length
}

module.exports = async (keys, params, option=null) => {
  try {
    requiredParams = required(keys.required, params)
    optionalParams = optional(keys.optional, params, option)
    outputParams = { ...requiredParams, ...optionalParams }

    return { status: 202, output: outputParams }
  } catch (errors) {
    errorsOutput = { errors: JSON.parse(errors.message) }

    return { status: 422, output: errorsOutput }
  }
}