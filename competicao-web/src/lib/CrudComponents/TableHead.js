import React from 'react';
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {withRouter} from 'react-router-dom'

class EnhancedTableHead extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      field: props.defaultOrder,
      direction: 'asc'
    };
  }

  getFieldDirection = ({ location: {search}}) => {
    const searchParams = new URLSearchParams(search);
    const order = searchParams.get('order');
    if (!order) {return;};
    const [field, direction = 'asc'] = order.split(' ');
    this.setState({ field, direction });
  }

  componentDidMount() {
    this.getFieldDirection(this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getFieldDirection(this.props);
    }
  }

  onRequestSort = newField => {
    const { history, location: {pathname, search} } = this.props
    const searchParams = new URLSearchParams(search)
    const { direction, field } = this.state
    let newDirection = 'asc'
    if (field === newField) {
      newDirection = direction === 'desc' ? 'asc' : 'desc'
    }
    searchParams.set('order', `${newField} ${newDirection}`)
    history.push(`${pathname}?${searchParams.toString()}`)
  }

  render() {
    const { columns, above, hideColumns = {}, hideEmptyColumn } = this.props;
    const { field: selctedField, direction } = this.state;

    return (
      <TableHead>
        {above}
        <TableRow>
          {
            columns.map(({ label, source, noOrder, numeric }) => {
              if (hideColumns[source] && hideColumns[source]()) {
                return null;
              }

              if (noOrder) {
                return (
                  <TableCell key={source}>
                    {label}
                  </TableCell>
                );
              }
              return (
                <TableCell
                  key={source}
                  numeric={numeric}
                >
                  <TableSortLabel
                    active={selctedField === source}
                    direction={direction}
                    onClick={event => this.onRequestSort(source)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              );
            })
          }
          {hideEmptyColumn ? null : <TableCell />}
        </TableRow>
      </TableHead>
    );

  }
}

export default withRouter(EnhancedTableHead)


