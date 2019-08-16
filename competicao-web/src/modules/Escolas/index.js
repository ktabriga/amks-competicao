import React from 'react'
import {List, CrudForm} from '../../lib/CrudComponents'
import Grid from '@material-ui/core/Grid'
import {TextField} from 'final-form-material-ui';
import {Field} from 'react-final-form';
import {ListApi, FormApi} from '../../lib/Api'
import {escolasApi} from '../../services/Api'

export function EscolasList(props) {
  const listOptions = {
    defaultOrder: 'nome',
    fields: {
      id:{
        label: 'Código'
      },
      nome:{
        label: 'Nome'
      }
    }
  }

  return (
    <ListApi
      api={escolasApi}>
      {
        ({getPage, handleDelete, getCount}) => (
          <List
            {...props}
            withPaper
            deleteItem={handleDelete}
            labelNew={'Novo'}
            filterLabels={{find: 'Buscar', clear: 'Limpar'}}
            onClickEdit={(item) => props.history.push(`/escolas/${item.id}`)}
            onClickNew={() => props.history.push('/escolas/new')}
            getPage={getPage}
            getCount={getCount}
            listOptions={listOptions} />
        )
      }
    </ListApi>
  )
}


export function EscolaForm({classes, ...props}) {
  const validate = values => ({
    nome: values.nome ? undefined : 'Obrigatório',
  })

  return (
    <FormApi
      {...props}
      initialData={{removed: false}}
      api={escolasApi} >
      {
        ({handleSubmit, getItem}) => (
          <CrudForm
            withPaper
            validate={validate}
            history={props.history}
            getItem={() => getItem({inclue: 'escola'})}
            onSubmit={handleSubmit}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  autoFocus
                  component={TextField}
                  label='Nome'
                  name='nome' />
              </Grid>
            </Grid>
          </CrudForm>
        )
      }
    </FormApi>
  )
}

