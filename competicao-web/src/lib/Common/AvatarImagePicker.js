import React, {useState, useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar'
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import classNames from 'classnames'
import PickImage from './PickImage'

const styles = theme => ({
  avatar: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButton: {
    color: '#fff'
  },
  darken: {
    filter: 'gray', /* IE6-9 */
    '-webkit-filter': 'brightness(40%)', /* Chrome 19+, Safari 6+, Safari 6+ iOS */
    transition: 'filter 0.5s',
  },
  normal: {
    filter: 'gray', /* IE6-9 */
    '-webkit-filter': 'brightness(100%)', /* Chrome 19+, Safari 6+, Safari 6+ iOS */
    transition: 'filter 0.5s',
  },
  avatarControlsContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})




const EditAvatarControls = ({classes, onChange, ...props}) => (
  <div
    {...props}
    className={classes.avatarControlsContainer}>
    <PickImage onChange={onChange}>
      <IconButton component='span' className={classes.iconButton}>
        <EditIcon />
      </IconButton>
    </PickImage>
    <IconButton onClick={() => onChange && onChange(undefined)} className={classes.iconButton}>
      <DeleteIcon />
    </IconButton>
  </div>
)

const NewAvatarControls = ({classes, onChange, ...props}) => (
  <div
    {...props}
    className={classes.avatarControlsContainer}>
    <PickImage onChange={onChange}>
      <IconButton component='span' className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </PickImage>
  </div>
)
function AvatarImagePicker({classes, value, onChange}) {
  const hasValue = !!value
  const [showControls, changeShowControls] = useState(false)
  const getStringData = () => {
    if (typeof value === 'string')
      return value
    return value[0].dataURL
  }
  useEffect(() => {
    value && changeShowControls(false)
  }, [value])
  return (
    <div style={{position: 'relative'}}>
      <Avatar
        onMouseEnter={() => changeShowControls(true)}
        onMouseLeave={() => changeShowControls(false)}
        src={hasValue ? getStringData() : require('../../images/empty-avatar.png')}
        className={classNames(classes.avatar, showControls ? classes.darken: classes.normal)}/>
      {showControls &&  !hasValue && (
        <NewAvatarControls
          classes={classes}
          onChange={onChange}
          onMouseEnter={() => changeShowControls(true)}
          onMouseLeave={() => changeShowControls(false)}/>
      )}
      {showControls &&  hasValue && (
        <EditAvatarControls
          onChange={onChange}
          classes={classes}
          onMouseEnter={() => changeShowControls(true)}
          onMouseLeave={() => changeShowControls(false)}/>
      )}
    </div>
  )
}

function AvatarImagePickerField({input, meta, ...props}) {
  return (
    <AvatarImagePicker
      {...props}
      value={input.value}
      onChange={input.onChange}/>
  )
}


export default withStyles(styles)(AvatarImagePickerField)
