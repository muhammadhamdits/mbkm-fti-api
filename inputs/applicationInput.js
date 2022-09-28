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

const optional = (keys, params) => {
  validParams = {}

  keys.forEach(key => {
    if (params[key]) validParams[key] = params[key]
  })

  return validParams
}

module.exports = async (keys, params) => {
  try {
    requiredParams = required(keys.required, params)
    optionalParams = optional(keys.optional, params)
    outputParams = { ...requiredParams, ...optionalParams }

    return { status: 202, output: outputParams }
  } catch (errors) {
    errorsOutput = { errors: JSON.parse(errors.message) }

    return { status: 401, output: errorsOutput }
  }
}