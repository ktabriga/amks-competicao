import React from 'react';
import  TablePagination from '@material-ui/core/TablePagination';

class Pagination extends React.Component {
  changePage = (event, page) => {
    this.navigateWithParam('page', page)
  }

  navigateWithParam = (param='', value=0) => {
    const { location: {search, pathname}} = this.props;
    const searchParams = new URLSearchParams(search);
    searchParams.set(param, value);
    this.props.history.push(`${pathname}?${searchParams.toString()}`);
  }

  componentDidMount() {
    //this.props.fetchCount(this.props.serverService)
  }

  changeRowsPerPage = ({target: {value}}) => {
    this.navigateWithParam('rows', value)
  }

  labelDisplayedRows = (page) => {
    const {ofLabel = 'of'} = this.props
    return `${page.from}-${page.to} ${ofLabel} ${page.count}`;
  }

  render() {
    const { count, location: {search}, labelRowsPerPage} = this.props
    const params = new URLSearchParams(search)
    const page = Number(params.get('page')) || 0
    const rowsPerPage =  Number(params.get('rows')) || 10
    return (
      <TablePagination
        component="div"
        count={count}
        labelDisplayedRows={this.labelDisplayedRows}
        labelRowsPerPage={labelRowsPerPage}
        onChangePage={this.changePage}
        onChangeRowsPerPage={this.changeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10,25,50]}
        style={{width: '50px'}}
      />
    );
  }
}


export default Pagination
