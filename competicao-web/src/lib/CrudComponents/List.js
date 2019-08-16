import React from 'react'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableFooter from '@material-ui/core/TableFooter'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from './TableHead'
import TableBody from './TableBody'
import * as R from 'ramda'
import Pagination from './Pagination'
import LinearProgress from '@material-ui/core/LinearProgress';
import {Form} from 'react-final-form'
import filterable from './HOC/filter'
import FilterActions from './FilterActions'
import Snackbar from '../Common/Snackbar'

export default class List extends React.Component {
  state = {
    fields: [],
    list: [],
    loading: true
  }

  constructor(props) {
    super(props)
    const fields = this.createFields()
    this.state = { fields }
    this.FilterForm = this.renderFilter()
  }

  createFields = () => {
    const {fields} = this.props.listOptions
    return R.keys(fields).map(source => {
      const field =  fields[source]
      const {label = source, type, format, getOne, key} = field
      return {
        key,
        getOne,
        format,
        label,
        source,
        type
      }
    })
  }

  renderFilter = () => {
    const {filter: FilterForm, filterLabels} = this.props
    if (FilterForm) {
      const EnhancedFilter = ({onClear, ...rest}) => (
        <Form {...rest}>
          {
            ({handleSubmit}) => (
              <Paper style={{padding: 10, marginBottom: 20}}>
                <form onSubmit={handleSubmit}>
                  <FilterForm />
                  <FilterActions onClear={onClear} labels={filterLabels}/>
                </form>
              </Paper>
            )
          }
        </Form>
      )
      return filterable(EnhancedFilter)
    }
    return () => <div />
  }

  urlFilterToObject = filter => {
    if (!filter) return {}
    return filter.split(',')
      .reduce((obj, keyValue) => {
        const [key, value] = keyValue.split('=')
        return {...obj, [key]: value}
      }, {})
  }

  updatePage = async () => {
    const {getPage, getCount, location, listOptions} = this.props
    const params = new URLSearchParams(location.search)
    const filter = this.urlFilterToObject(params.get('filters'))
    if (getPage) {
      this.setState({loading: true})
      const page = +params.get('page') || 0
      const rowsPerPage = +params.get('rows') || 10
      const order = params.get('order') || listOptions.defaultOrder
      const list = await getPage({page, rowsPerPage, filter, order})
      this.setState({ list, loading: false }) }
    if (getCount) {
      const count = await getCount({filter})
      this.setState({ count })
    }
  }

  componentDidMount() {
    this.updatePage()
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location.search === prevProps.location.search)  return
    this.updatePage()
  }

  handleClickDelete = async (item) => {
    const {deleteItem} = this.props
    if (deleteItem) {
      const {ok, message='Item removed. Do you want to revert it?', undo} = await deleteItem(item)
      if (ok) {
        this.setState({
          removedMessage: message,
          removedItem: item
        })
        this.updatePage()
        this.undo = async () => {
          this.handleSnackbarClose()
          if (undo) {
            await undo()
            this.updatePage()
          }
        }
      }
    }
  }

  undoAction = () => {
    return [
      <Button key="undo" color="secondary" size="small" onClick={this.undo}>
        DESFAZER
      </Button>
    ]
  }

  handleSnackbarClose = () => {
    this.setState({removedMessage: ''})
  }

  renderList = () => {
    const {listOptions: {defaultOrder = ''}, withPaper, onClickNew, getCount, onClickEdit, labelRowsPerPage='Linhas por página', ofLabel='de', labelNew='New', history, location, deleteItem} = this.props
    const {list = [], loading, removedMessage} = this.state
    const {fields, count=0} = this.state
    const Container = withPaper ? Paper : (props => <div {...props}/>)
    return (
      <Container padding={0}>
        {loading ? <LinearProgress/>: null}
        <Table>
          <TableHead
            above={(
              <TableRow>
                <TableCell align='right' colSpan={fields.length} className="pl-0">
                  {
                    getCount && (
                      <Pagination
                        count={count}
                        history={history}
                        location={location}
                        ofLabel={ofLabel}
                        labelRowsPerPage={labelRowsPerPage} />
                    )
                  }
                </TableCell>
                <TableCell align='right' colSpan={2} className="pb-25 pt-25">
                  <Button variant='contained' style={{width: 120}} color="primary" onClick={onClickNew}>{labelNew}</Button>
                </TableCell>
              </TableRow>
            )}
            defaultOrder={defaultOrder}
            columns={fields}/>
          <TableBody
            onClickEdit={onClickEdit}
            onClickDelete={deleteItem ? this.handleClickDelete : null}
            list={list}
            fields={fields} />
        </Table>
        <Snackbar message={removedMessage} action={this.undoAction()} onClose={this.handleSnackbarClose} autoHideDuration={4000}/>
      </Container>

    )
  }

  render() {
    const FilterForm = this.FilterForm
    return (
      <div>
        <FilterForm />
        {this.renderList()}
      </div>
    )
  }
}
