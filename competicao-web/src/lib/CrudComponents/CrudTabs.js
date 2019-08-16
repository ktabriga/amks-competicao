import React, {useState, useEffect, useContext} from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper'
import {Route} from 'react-router-dom'
import Badge from './Badge'

const TabsContext = React.createContext({})

export const useParentChildrenNavigation = (props, {mainPath, availableTabs=[]}) => {
  const [current, setTab] = useState('')

  const navigate = (target) => () => {
    const {id} = props.match.params
    const {pathname} = props.location
    if (target === 'newChild') {
      return props.history.push(pathname + '/new-child')
    }
    return props.history.push(`/${mainPath}/${id}/${target}`)
  }

  useEffect(() => {
    const {pathname} = props.location
    const [tab = ''] = availableTabs.map(tab =>
      pathname.includes(tab) ? tab : null
    ).filter(x => !!x)

    return setTab(tab)

  })

  return {current, navigate}
}

export const makePathWithMain = mainPath => ({name, isForm} = {}) => {
  if (!name) return `/${mainPath}/:id`
  if (isForm) return `/${mainPath}/:id/${name}/:childId`
  return `/${mainPath}/:id/${name}`
}

export const CrudRoute = ({name='', isForm, render}) => {
  const tabsContext = useContext(TabsContext)
  const makePath = makePathWithMain(tabsContext.mainPath)
  return (
    <Route
      path={makePath({name, isForm})}
      exact
      render={render} />
    );
}
export const CrudTabs = ({current, mainPath, children, navigate, tabs=[], ...props}) => {
  return (
    <div>
      <Paper >
        <div>
          <Tabs indicatorColor='primary' value={current} onChange={(_, value) => navigate(value)()}>
            {
              tabs.map((tab, index) =>
                <Tab key={tab.value}  value={tab.value}
                  disabled={index > 0 && props.location.pathname.includes('new')}
                  label={
                    <Badge
                      content={index + 1}
                      disabled={tab.value !== current}
                      primary
                      label={tab.label}/>
                  }/>
              )
            }
          </Tabs>
        </div>
        <TabsContext.Provider value={{mainPath}}>
          {children}
        </TabsContext.Provider>
      </Paper>
    </div>
  )
}
