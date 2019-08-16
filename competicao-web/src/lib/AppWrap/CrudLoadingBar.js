import React from 'react'                                          
import { connect } from 'react-redux'                              
import { LinearProgress } from '@material-ui/core/LinearProgress'; 


class CrudLoadingBar extends React.Component {                     

  render() {                                                       
    const {isFetching} = this.props                                
    return (isFetching ? <LinearProgress /> : null)                
  }                                                                
}                                                                  

const mapStateToProps = (state) => {                               
  return {                                                         
    isFetching: state.crud && state.crud.fetching                                
  }                                                                
}                                                                  


export default connect(mapStateToProps)(CrudLoadingBar)            

