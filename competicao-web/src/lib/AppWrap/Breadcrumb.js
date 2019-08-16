import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import * as R from 'ramda'
import classNames from 'classnames'
import styles from './BreadcrumbStyles'
import Typography from '@material-ui/core/Typography'
import { compose } from 'recompose'
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import {getBreadcrumbConfig} from './BreadCrumbUtils'

class Breadcrumb extends React.Component {
  state = {parts:[]}

  setParts = () => {
    const {pathname} = this.props.history.location
    const parts = getBreadcrumbConfig(pathname) || []
    this.setState({parts})
  }

  componentDidMount() {
    this.setParts()
  }

  componentDidUpdate(prevProps){
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setParts()
    }
  }

  navigate = (path)=>{
    this.props.history.push(`/${path}`)
  }

  getLabel = (part, index) => {

    switch (true) {
      case part.isId:
        if (index === 1)
          return R.pathOr(part.pathPart, ['info', 'label'], this.props)
        return part.pathPart
      case part.pathPart === 'new' || part.pathPart === 'new-child':
        return 'Novo'
      default:
        return part.pathPart.replace(/-/g, ' ')
    }
  }

  renderPart = (part, index) => {
    return (
      <Typography
        className={classNames(this.props.classes.part, part.isCurrentPath && this.props.classes.currentPath)}
        type={index === 0 ? 'subtitle1' : 'caption'}
        onClick={() => this.navigate(part.path)}
        key={part.pathPart}>
        {this.getLabel(part, index)}
        {!part.isFinalPath && <ArrowIcon className={this.props.classes.separator}/>}
      </Typography>)
  }

  render () {
    const { classes} = this.props

    return (
      <div className={classNames(classes.root)}>
        {
          this.state.parts.map(this.renderPart)
        }
      </div>
    )
  }
}


export default compose(
  withStyles(styles)
)(Breadcrumb)

