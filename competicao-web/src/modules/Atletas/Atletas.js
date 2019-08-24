import React from 'react'
import {List, CrudForm} from '../../lib/CrudComponents'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import {TextField} from 'final-form-material-ui';
import {Field} from 'react-final-form';
import Checkbox from '../../lib/Common/Checkbox'
import {ListApi, FormApi} from '../../lib/Api'
import {atletasApi, escolasApi} from '../../services/Api'
import DatePicker from '../../lib/Fields/DatePicker'
import Select from '../../lib/Fields/Select'
import {loopbackFilters} from '../../lib/Api/loopback'
import {useParentChildrenNavigation, CrudTabs, CrudRoute} from '../../lib/CrudComponents/CrudTabs'
import Autocomplete from '../../lib/Fields/Autocomplete'
import {toOption} from '../../lib/Api/Entity'

function AtletaFilter(props) {
  const loadEscolas = async (inputValue) => {
    const response = await escolasApi.getList({
      where : {
        nome: loopbackFilters.regexp(inputValue)
      },
      limit: 5
    })
    if (response.ok) {
      return response.data.map(toOption('nome'))
    }
    return []
  }

  return (
    <Grid spacing={24} container>
      <Grid item sm>
        <Field
          fullWidth
          component={TextField}
          label='Nome'
          name="nome"/>
      </Grid>
      <Grid item sm>
        <Field
          fullWidth
          component={DatePicker}
          label='Data Nascimento'
          name="nascimento"/>
      </Grid>
      <Grid item sm>
        <Field
          fullWidth
          loadOptions={loadEscolas}
          component={Autocomplete}
          label='Escola'
          name="escolaId"/>
      </Grid>
    </Grid>
  )
}

export function AtletaList(props) {
  const listOptions = {
    defaultOrder: 'nome',
    fields: {
      nome:{
        label: 'Nome'
      },
      nascimento: {
        label: 'Data Nascimento',
        format: nascimento => nascimento ? moment(nascimento).format('DD/MM/YYYY') : ''
      },
      graduacao:{
        label: 'Graduação'
      },
    }
  }

  return (
    <ListApi
      filtersConfig={{
        nome: loopbackFilters.regexp
      }}
      api={atletasApi}>
      {
        ({getPage, handleDelete, getCount}) => (
          <List
            {...props}
            withPaper
            filter={AtletaFilter}
            deleteItem={handleDelete}
            labelNew={'Novo'}
            filterLabels={{find: 'Buscar', clear: 'Limpar'}}
            onClickEdit={(item) => props.history.push(`/atletas/${item.id}`)}
            onClickNew={() => props.history.push('/atletas/new')}
            getPage={getPage}
            getCount={getCount}
            listOptions={listOptions} />
        )
      }
    </ListApi>
  )
}

