import {percent, money, phone, cnpj, cpf, cep,
  shortDateUnmask, shortDateMask, shortTimeMask, shortTimeUnmask} from './Masks'

const NAME_TO_MAPPER = {
  money,
  phone,
  cnpj,
  cpf,
  cep,
  percent,
  shortTime: {
    mask: shortTimeMask,
    unmask: shortTimeUnmask
  },
  shortDate: {
    mask: shortDateMask,
    unmask: shortDateUnmask
  },
}

const makeFieldMapper = mapperName => {
  const mapper = NAME_TO_MAPPER[mapperName] && NAME_TO_MAPPER[mapperName].mask
  return mapper || (obj => obj)
}

export const makeFieldUnmapper = mapperName => {
  const mapper = NAME_TO_MAPPER[mapperName] && NAME_TO_MAPPER[mapperName].unmask
  return mapper || (obj => obj)
}

const mapOrUnmapEntity = mapperOrUnmapperMaker => model => entity => {
  const newEntity = {...entity}
  Object.getOwnPropertyNames(model.fields || {})
    .forEach(fieldName =>{
      const mapperNames = model.fields[fieldName].mapper || []
      mapperNames.forEach(mapperName => {
        const fieldMapper = mapperOrUnmapperMaker(mapperName)
        newEntity[fieldName] = fieldMapper(newEntity[fieldName])
      })
    })
  return newEntity
}

export const mapEntity = mapOrUnmapEntity(makeFieldMapper)
export const unmapEntity = mapOrUnmapEntity(makeFieldUnmapper)
