import React, { Component } from 'react'
import FormGroup from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox'
import grey from '@material-ui/core/colors/grey';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  center:{
    justifyContent: 'center'
  },
  checkboxBordered: {
    border: `solid 1px ${grey['400']}`,
    borderRadius: 28,
  },
  checkboxSelected: {
    borderColor: theme.palette.primary.main
  },
  checkboxDisabled:{
    borderColor:  grey['400']
  }
})

class CheckboxInput extends Component {
  render() {

    const {disabled, simple , center , classes, input: { value, onChange} , label} = this.props

    return (
      <FormGroup style={{width: '100%'}} className={classNames(!simple && classes.checkboxBordered, value && classes.checkboxSelected, disabled && classes.checkboxDisabled)}>

        <FormControlLabel classes={center && {root: classes.center}}
          control={
            <Checkbox
              color='primary'
              onChange={(value) => onChange(value)}
              checked={value}
              disabled={disabled}/>
          }
          label={label}
          style={{margin: '0px'}}>
        </FormControlLabel>

      </FormGroup>
    )
  }
}

export default withStyles(styles)(CheckboxInput);
