import React from 'react';
import AppWrap from '../../lib/AppWrap'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import Typography from '@material-ui/core/Typography'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import {Route, Switch} from 'react-router-dom'
import logo from '../../images/logo-avaliare-white.png';
import {
  AtletaForm,
  AtletaList
} from '../Atletas'
import {
  EscolasList,
  EscolaForm
} from '../Escolas'
import {
  CategoriaList,
  CategoriaTabs
} from '../Categorias'
const menuItems = [
  {
    icon: PersonIcon,
    pathname: `/atletas` ,
    label: 'Atletas'
  }, {
    icon: HomeIcon,
    pathname: `/dojos` ,
    label: 'Dojos'
  }, {
    icon: FitnessCenter,
    pathname: `/categorias` ,
    label: 'Categorias'
  }
]


const Home = () => (
  <AppWrap
    logo={<Typography variant='h4' style={{color: 'white'}}>AMKS</Typography>}
    menuItems={menuItems}>
    <Switch>
      <Route path='/atletas' exact component={AtletaList} />
      <Route path='/atletas/:id' component={AtletaForm} />
      <Route path='/dojos' exact component={EscolasList} />
      <Route path='/dojos/:id' component={EscolaForm} />
      <Route path='/categorias' exact component={CategoriaList} />
      <Route path='/categorias/:id' component={CategoriaTabs} />
    </Switch>
  </AppWrap>
)

export default Home


