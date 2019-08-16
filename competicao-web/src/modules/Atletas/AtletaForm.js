import React from 'react'
import Grid from '@material-ui/core/Grid'
import {List, CrudForm} from '../../lib/CrudComponents'
import {loopbackFilters} from '../../lib/Api/loopback'
import * as R from 'ramda'
import Avatar from '@material-ui/core/Avatar'
import {TextField} from 'final-form-material-ui';
import {Field} from 'react-final-form';
import Checkbox from '../../lib/Common/Checkbox'
import {FormApi} from '../../lib/Api'
import Select from '../../lib/Fields/Select'
import DatePicker from '../../lib/Fields/DatePicker'
import Autocomplete from '../../lib/Fields/Autocomplete'
import {atletasApi, escolasApi} from '../../services/Api'
import {withStyles} from '@material-ui/core/styles'
import AvatarImagePicker from '../../lib/Common/AvatarImagePicker'
import {toOption} from '../../lib/Api/Entity'

const styles = theme => ({
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const graduacoes = [
  {value: 'BRANCA', label: 'Branca'},
  {value: 'AZUL', label: 'Azul'},
  {value: 'AMARELA', label: 'Amarela'},
  {value: 'VERMELHA', label: 'Vermelha'},
  {value: 'VERDE', label: 'Verde'},
  {value: 'LARANJA', label: 'Laranja'},
  {value: 'ROXA', label: 'Roxa'},
  {value: 'MARROM', label: 'Marrom'},
  {value: 'PRETA', label: 'Preta'},
]

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

function AtletaForm({classes, ...props}) {
  const validate = values => ({
    nome: values.nome ? undefined : 'Obrigatório',
    nascimento: values.nascimento ? undefined : 'Obrigatório',
  })

  const submitDecorator = async ({id, data, handleSubmit}) => {
    return handleSubmit({
      id,
      data: {
        ...data,
        altura: Number(data.altura) || undefined,
        peso: Number(data.peso) || undefined,
        escolaId: R.path(['escola', 'id'], data)
      }
    })
  }



  const getItemDecorator = async ({getItem}) => {
    const item =  await getItem({include: 'escola'})
    if (item) {
      return {
        ...item,
        escola: item.escola ? toOption('nome')(item.escola) : undefined
      }
    }
  }


  return (
    <FormApi
      {...props}
      initialData={{removed: false}}
      submitDecorator={submitDecorator}
      getItemDecorator={getItemDecorator}
      api={atletasApi} >
      {
        ({handleSubmit, getItem}) => (
          <CrudForm
            withPaper
            validate={validate}
            history={props.history}
            getItem={getItem}
            onSubmit={handleSubmit}>
            <Grid container spacing={16}>
              <Grid item sm={4} xs={12}>
                <Field
                  fullWidth
                  autoFocus
                  component={TextField}
                  label='Nome'
                  name='nome' />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Field
                  fullWidth
                  component={Select}
                  options={graduacoes}
                  label='Graduação'
                  name='graduacao' />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Field
                  fullWidth
                  loadOptions={loadEscolas}
                  autoFocus
                  component={Autocomplete}
                  label='Escola'
                  name='escola' />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Field
                  fullWidth
                  component={DatePicker}
                  label='Data Nascimento'
                  name='nascimento' />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Field
                  type='number'
                  fullWidth
                  component={TextField}
                  label='Altura em cm'
                  name='altura' />
              </Grid>
              <Grid item sm={4} xs={12}>
                <Field
                  type='number'
                  fullWidth
                  component={TextField}
                  label='Peso'
                  name='peso' />
              </Grid>
            </Grid>
          </CrudForm>
        )
      }
    </FormApi>
  )
}

export default withStyles(styles)(AtletaForm)
