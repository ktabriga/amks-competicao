import React, {useState, useEffect} from 'react'
import {List, CrudForm} from '../../lib/CrudComponents'
import {loopbackFilters} from '../../lib/Api/loopback'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Autocomplete from '../../lib/Common/Autocomplete'
import {TextField} from 'final-form-material-ui';
import {Field} from 'react-final-form';
import {ListApi, FormApi} from '../../lib/Api'
import Checkbox from '../../lib/Common/Checkbox'
import {categoriasApi, resultadoApi, escolasApi, chaveApi, atletasApi, categoriaAtletaApi} from '../../services/Api'
import {useParentChildrenNavigation, CrudTabs, CrudRoute} from '../../lib/CrudComponents/CrudTabs'
import {toOption} from '../../lib/Api/Entity'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete'
import Chave from '../Chave'
import domtoimage from 'dom-to-image'
import fileSaver from 'file-saver'

export function CategoriaList(props) {
  const listOptions = {
    defaultOrder: 'nome',
    fields: {
      id:{
        label: 'Código'
      },
      nome:{
        label: 'Nome'
      },
      concluido:{
        label: 'Concluído',
        format: value => value ? 'Sim' : 'Não'
      }
    }
  }

  return (
    <ListApi
      api={categoriasApi}>
      {
        ({getPage, handleDelete, getCount}) => (
          <List
            {...props}
            withPaper
            deleteItem={handleDelete}
            labelNew={'Novo'}
            filterLabels={{find: 'Buscar', clear: 'Limpar'}}
            onClickEdit={(item) => props.history.push(`/categorias/${item.id}`)}
            onClickNew={() => props.history.push('/categorias/new')}
            getPage={getPage}
            getCount={getCount}
            listOptions={listOptions} />
        )
      }
    </ListApi>
  )
}


export function CategoriaForm({classes, ...props}) {
  const validate = values => ({
    nome: values.nome ? undefined : 'Obrigatório',
  })

  return (
    <FormApi
      {...props}
      initialData={{removed: false}}
      api={categoriasApi} >
      {
        ({handleSubmit, getItem}) => (
          <CrudForm
            withPaper
            validate={validate}
            history={props.history}
            getItem={() => getItem({inclue: 'escola'})}
            onSubmit={handleSubmit}>
            <Grid container spacing={16}>
              <Grid item xs={10}>
                <Field
                  fullWidth
                  autoFocus
                  component={TextField}
                  label='Nome'
                  name='nome' />
              </Grid>
              <Grid item xs={2}>
                <Field
                  fullWidth
                  autoFocus
                  component={Checkbox}
                  label='Concluído'
                  name='concluido' />
              </Grid>
            </Grid>
          </CrudForm>
        )
      }
    </FormApi>
  )
}


const loadAtletas = async (inputValue) => {
  const response = await atletasApi.getList({
    where : {
      nome: loopbackFilters.regexp(inputValue)
    },
    include: 'escola',
    order: 'nome',
    limit: 5
  })
  if (response.ok) {
    return response.data.map(data => ({
      payload: data,
      ...toOption('nome')(data)
    }))
  }
  return []
}

const Participantes = (props) => {
  const [participante, setParticipante] = useState()
  const [participantes, setParticipantes] = useState([])

  const handleAutocompleteChange = data => {
    setParticipante(data)
  }

  const handleSendClick = async () => {
    if (!participante) return
    const {match: {params}} = props
    const response = await categoriaAtletaApi.create({
      atletaId: participante.id,
      categoriaId: params.id
    })
    if (response.ok) {
      setParticipantes(participantes.concat({
        categoriaAtletaId: response.data.id,
        ...participante.payload
      }))
      setParticipante(null)
    }
    console.log('Erro ao adicionar atleta', response.data)
  }

  const fetchParticipantes = async () => {
    const {match: {params}} = props
    const response = await categoriaAtletaApi.getList({
      where: {
        categoriaId: params.id
      },
      include: 'atleta'
    })
    if (response.ok) {
      const promises = response.data.map(async data => {
        const escolaResponse = await escolasApi.getOne(data.atleta.escolaId)
        return ({
          ...data.atleta,
          id: data.id,
          categoriaAtletaId: data.id,
          escola: escolaResponse.data
        })
      })
      const participantes = await Promise.all(promises)
      setParticipantes(participantes)
    }
  }

  useEffect(() => {
    fetchParticipantes()
  }, [props.match.params.id])



  const handleDelete = async item => {
    const response = await categoriaAtletaApi.deleteF(item.categoriaAtletaId)
    if (response.ok) {
      setParticipantes(
        participantes.filter(p => {
          return p.categoriaAtletaId !== item.categoriaAtletaId
        })
      )
    }
  }

  return (
    <Grid container direction='column' spacing={16} style={{padding: 16, paddingTop: 32}}>
      <Grid item>
        <Autocomplete
          value={participante}
          label='Atleta'
          loadOptions={loadAtletas}
          onChange={handleAutocompleteChange} />
      </Grid>
      <Grid item style={{widht: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleSendClick} >
          Adicionar
        </Button>
      </Grid>
      <Grid item>
        <Table style={{minWidth: 700}}>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Escola</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participantes.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"> {row.nome} </TableCell>
                <TableCell>{row.escola && row.escola.nome}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="Deletar"
                    onClick={() => handleDelete(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  )
}
const ajustarConflitos = competidores => {
  const conflitos = []
  const copy = [...competidores]
  console.table(competidores)
  for (let i = 0; i < competidores.length; i= i+2 ) {
    const current = competidores[i]
    const next = competidores[i + 1]
    if (!next) break
    if (current.escolaId === next.escolaId) {
      conflitos.push({
        index: i + 1,
        payload: next,
        escolaId: next.escolaId
      })
    }
  }
  console.table(conflitos)

  conflitos.forEach(conflito => {
    for (let i = 0; i < competidores.length; i = i + 2) {
      const current = competidores[i]
      const next = competidores[i + 1]
      if (!next) break
      if (current.escolaId === conflito.escolaId || next.escolaId === conflito.escolaId) {
        console.log('troca', {
          conflito,
          current,
          next
        })
        continue;
      }
      copy[conflito.index] = current
      copy[i] = conflito.payload
      break;
    }
  })

  console.table(copy)
  return copy
}

const ChaveTab = (props) => {
  const [atletasChave, setAtletasChave] = useState([])
  const [categoria, setCategoria] = useState({})
  const randomOrder = () => Math.floor(Math.random() * 20);
  const gerarChave = async () => {
    const categoriaId = props.match.params.id
    const participantesResponse = await categoriaAtletaApi.getList({
      where: { categoriaId },
      include: 'atleta'
    })
    if (participantesResponse.ok) {
      let newAtletasChave = participantesResponse.data.map(p => ({
        ...p,
        ordem: randomOrder()
      })).sort((a, b) => a.ordem - b.ordem)
        .map((participante, index) => ({
          ordem: index,
          id: participante.id,
          name: `${participante.atleta.escolaId || ''} ${participante.atleta.nome}`,
          escolaId: participante.atleta.escolaId,
          atletaId: participante.atleta.id,
          categoriaId
        }))
      newAtletasChave = ajustarConflitos(newAtletasChave)

      const atletasChaveListResponse = await getAtletasChaveList()
      if (atletasChaveListResponse.ok) {
        const {data: list} = atletasChaveListResponse
        list.forEach(a => chaveApi.deleteF(a.id))
      }
      const promises = newAtletasChave.map(a => {
        return chaveApi.create({
          atletaId: a.atletaId,
          categoriaId: a.categoriaId,
          ordem: a.ordem
        })
      })

      setAtletasChave(newAtletasChave)
    }
  }

  const getAtletasChaveList = () => {
    const categoriaId = props.match.params.id
    return chaveApi.getList({
      where: {categoriaId},
      include: 'atleta'
    })
  }

  const fetchChave = async () => {
    const response = await getAtletasChaveList()
    if (response.ok) {
      const atletasChave = response.data.map(a => ({
        id: a.id,
        name: `${a.atleta.escolaId || ''} ${a.atleta.nome}`,
      }))
      setAtletasChave(atletasChave)
    }
    const categoriaResponse = await categoriasApi.getOne(props.match.params.id)
    if (categoriaResponse.ok) {
      setCategoria(categoriaResponse.data)
    }
  }

  const download = async () => {
    const dataUrl = await domtoimage.toJpeg(document.getElementById('chave'), { quality: 0.95 })
    const link = document.createElement('a')
    link.download = categoria.nome
    link.href = dataUrl;
    link.click();
  }

  useEffect(() => {
    fetchChave()
  }, [props.match.params.id])

  return (
    <Grid container spacing={16} style={{padding: 16}} direction='column'>
      <Grid item style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button
          onClick={download}
          style={{marginRight: 16}}
          variant='outlined' color='primary'>
          Download
        </Button>
        <Button
          onClick={gerarChave}
          variant='contained' color='primary'>
          Gerar Chave
        </Button>
      </Grid>
      <Grid item>
        <Grid container id='chave' direction='column' style={{backgroundColor: 'White', padding: 16}}>
          <Grid item>
            <Typography variant='h5'> {categoria.nome} </Typography>
          </Grid>
          <Grid item>
            {
              atletasChave.length ?
                <Chave atletas={atletasChave} /> : null
            }
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const ResultadoAtleta = ({name, label}) => (
  <Grid item sm={8}>
    <Field
      fullWidth
      autoFocus
      loadOptions={loadAtletas}
      component={Autocomplete}
      label={label}
      name={name}/>
  </Grid>
)

const ResultadoEscola = () => {
  return (
    <Grid item sm={4} style={{display: 'flex', alignItems: 'flex-end'}}>
      <Typography variant='title'>Escola</Typography>
    </Grid>
  )
}

export function ResultadoForm(props) {
  const [resultado, setResultado] = useState()

  const submitDecorator = async ({id, data, handleSubmit}) => {
    const result = await handleSubmit({
      id: resultado ? resultado.id : 'new-child',
      data: {
        categoriaId: props.match.params.id,
        primeiro: data.primeiro && data.primeiro.id,
        segundo: data.segundo && data.segundo.id,
        terceiro: data.terceiro && data.terceiro.id,
        quarto: data.quarto && data.quarto.id,
        quinto: data.quinto && data.quinto.id,
        sexto: data.sexto && data.sexto.id,
        setimo: data.setimo && data.setimo.id,
        oitavo: data.oitavo && data.oitavo.id,
      }
    })
    console.log(result)
    return result
  }

  const getItem = async () => {
    const categoriaId = props.match.params.id
    const response = await resultadoApi.getList({
      where: {categoriaId},
      include: ['primeiroat', 'segundoat', 'terceiroat', 'quartoat', 'quintoat', 'sextoat', 'setimoat', 'oitavoat']
    })
    if (response.ok) {
      const data = response.data[0]
      setResultado(data)
      console.log(data)
      return {
        primeiro: toOption('nome')(data.primeiroat),
        segundo: toOption('nome')(data.segundoat),
        terceiro: toOption('nome')(data.terceiroat),
        quarto: toOption('nome')(data.quartoat),
        quinto: toOption('nome')(data.quintoat),
        sexto: toOption('nome')(data.sextoat),
        setimo: toOption('nome')(data.setimoat),
        oitavo: toOption('nome')(data.oitavoat),
      }
    }
  }

  return (
    <FormApi
      {...props}
      submitDecorator={submitDecorator}
      api={resultadoApi} >
      {
        ({handleSubmit}) => (
          <CrudForm
            withPaper
            history={props.history}
            onSubmit={handleSubmit}
            getItem={getItem}>
            <Grid container spacing={16}>
              <ResultadoAtleta
                label='Primeiro Lugar'
                name='primeiro'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Segundo Lugar'
                name='segundo'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Terceiro Lugar'
                name='terceiro'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Quarto Lugar'
                name='quarto'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Quinto Lugar'
                name='quinto'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Sexto Lugar'
                name='sexto'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Sétimo Lugar'
                name='setimo'/>
              <ResultadoEscola atleta={null} />
              <ResultadoAtleta
                label='Oitavo Lugar'
                name='oitavo'/>
              <ResultadoEscola atleta={null} />
            </Grid>
          </CrudForm>
        )
      }
    </FormApi>
  )
}

export function CategoriaTabs(props) {
  const {current, navigate} = useParentChildrenNavigation(props, {mainPath: 'categorias', availableTabs: ['participantes', 'chave', 'resultado']})
  return (
    <CrudTabs {...props}
      mainPath='categorias'
      current={current}
      tabs={[
        {value: '', label: 'Categoria'},
        {value: 'participantes', label: 'Participantes'},
        {value: 'chave', label: 'Chave'},
        {value: 'resultado', label: 'Resultado'},
      ]}
      navigate={navigate}>
      <div>
        <CrudRoute
          render={() => <CategoriaForm {...props}/>}/>
        <CrudRoute
          name='participantes'
          render={(props) => <Participantes {...props} />}/>
        <CrudRoute
          name='chave'
          render={(props) => <ChaveTab {...props} />}/>
        <CrudRoute
          name='resultado'
          render={(props) => <ResultadoForm {...props} />}/>
      </div>
    </CrudTabs>
  )
}
