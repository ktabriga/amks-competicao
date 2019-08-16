import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import {compose} from 'recompose'
import {Link, withRouter} from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  menuColor : {
    color: theme.palette.grey[500]
  },
  menuColorActive : {
    color: theme.palette.common.white
  },
  divider: {
    backgroundColor: '#9D9C9D'
  },
  active:{
    borderLeft: `solid 3px ${theme.palette.primary.main}`,
    borderImageSlice: 1
  }
})

class MenuItems extends React.Component {
  state = {open: ''}

  handleGroupClick = (label) => () => {
    this.setState({
      open: this.state.open === label ? '' : label
    })
  }
  renderItem = (item, key) => {
    if (item.group) {
      return (
        <div key={item.label} className={this.props.classes.menuColor}>
          <ListItem button onClick={this.handleGroupClick(item.label)}>
            <ListItemIcon classes={{root: this.props.classes.menuColor}}>
              <item.icon/>
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              classes={{primary: this.props.classes.menuColor}} />
            {this.state.open === item.label ? <ExpandLess color='inherit' /> : <ExpandMore color='inherit'/>}
          </ListItem>
          <Collapse in={this.state.open === item.label} timeout="auto" unmountOnExit>
            <List component="div" disablePadding >
              {
                item.items.map(this.renderListItem, true)
              }
            </List>
          </Collapse>
        </div>
      )
    }

    return this.renderListItem(item, key)
  }

  renderListItem = (item, key, isSubMenu) => {
    const {location} = this.props
    let active = false
    if (/.\/./.test(location.pathname)) {
      active = item.pathname && item.pathname.includes(location.pathname.split('/')[1])
    } else {
      active = location.pathname === item.pathname
    }

    return (
      <ListItem
        style={isSubMenu ? {paddingLeft: 28} : null}
        key={key}
        button
        classes={{root: active && this.props.classes.active}}
        component={Link}
        to={item.pathname}>
        <ListItemIcon
          classes={{root: active ? this.props.classes.menuColorActive : this.props.classes.menuColor}}>
          <item.icon/>
        </ListItemIcon>
        <ListItemText
          primary={item.label}
          classes={{primary: classNames(active ? this.props.classes.menuColorActive : this.props.classes.menuColor)}}/>
      </ListItem>
    )
  }

  render () {
    const {items = []} = this.props
    return (
      <div>
        { items.map(this.renderItem) }
      </div>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(MenuItems)
