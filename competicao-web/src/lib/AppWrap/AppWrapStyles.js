import blueGrey from '@material-ui/core/colors/blueGrey'

const drawerWidth = 240
const drawerClosedWidth = 60


const ApplicationStyles = theme => ({
  loadingBar: {
    zIndex: 2000,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  navBarRoot:{
    backgroundColor: theme.palette.common.white,
    //color: theme.colors.greyDark
    color: theme.palette.common.grey
  },
  root: {
    width: '100%',
    height:'100%',
    marginTop: 0,
    zIndex: 1,
    overflow: 'hidden'
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    marginLeft: drawerClosedWidth,
    width: `calc(100% - ${drawerClosedWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolsLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolsRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: '20px !important'
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100%',
    width: drawerWidth,
    background: blueGrey['900'],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: drawerClosedWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 12px',
    backgroundColor: theme.palette.primary.main,
    ...theme.mixins.toolbar
  },

  drawerLogo:{
    width: '210px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerLogoClosed:{
    width: '140px',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  content: {
    width: '100%',
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.grey["200"],
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 110px)',
      marginTop: 64,
    },
  },
  messageStyle : {
    background: theme.palette.primary.main,
    color: theme.palette.white
  }

});

export default ApplicationStyles;
