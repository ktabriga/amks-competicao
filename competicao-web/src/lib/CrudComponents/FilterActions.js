import React from 'react'
import {compose} from 'recompose'
import Button from '@material-ui/core/Button'
import { withTheme } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const defaultLabels = {
  simpleFilter: 'Simple',
  advancedFilter: 'Advanced',
  clear: 'Clear',
  find: 'Find'
}

const FilterActions = ({labels = defaultLabels, theme, fetching, onClear, toggleDetailedFilter, showDetailedFilter}) => (
  <Grid container justify="flex-start" alignItems="center" className="pb-10">

    {toggleDetailedFilter &&
        <Grid item xs>
          <Typography type="caption"
            onClick={toggleDetailedFilter}
            style={{cursor: 'pointer'}}
            color="primary">
            {showDetailedFilter ? labels.simpleFilter : labels.advancedFilter}
          </Typography>
        </Grid>
    }

    <Grid item xs>
      <Grid container justify="flex-end"  alignItems="center">
        <Grid item>
          <Button style={{width: 120}} type="button" onClick={onClear}>
            {labels.clear}
          </Button>
        </Grid>

        <Grid item>
          <Button style={{width: 120}}  type="submit" disabled={fetching} color="primary" >
            {fetching &&
                <CircularProgress color="inherit" size={20}/>
            }
            {labels.find}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
)


export default compose(
  withTheme(),
)(FilterActions)

