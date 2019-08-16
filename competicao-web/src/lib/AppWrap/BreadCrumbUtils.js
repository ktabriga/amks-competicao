export function getBreadcrumbConfig(path){
  const pathParts = path.trim().split(/\//).filter((part) => part.trim().length > 0)
  const breadCrumgConfig = []
  let partIndex  = 0
  let pathPart



  for (partIndex; partIndex < pathParts.length; partIndex++) {
    pathPart = pathParts[partIndex]

    const configPart = {pathPart}

    if(parseInt(pathPart, 10) > 0){
      configPart.isId = true
    }

    configPart.path = pathParts.slice(0,partIndex + 1).join('/')
    configPart.isFinalPath = partIndex === (pathParts.length - 1)

    if(configPart.isFinalPath && configPart.isId){
      breadCrumgConfig[breadCrumgConfig.length - 1].isCurrentPath = true
    }else if(configPart.isFinalPath){
      configPart.isCurrentPath = true
    }

    configPart.isNew = breadCrumgConfig.path === 'new'

    breadCrumgConfig.push(configPart)

  }

  return breadCrumgConfig
}
