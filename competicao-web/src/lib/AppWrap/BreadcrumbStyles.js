const BreadcrumbStyles = theme => ({
  root:{
    display: 'flex',
    flexDirection: 'row',
    marginButton: '15px',
    alignItems: 'center'
  },
  currentPath:{        
    fontWeight: 'bold',
    color: theme.palette.common.grey,
    cursor: 'default !important'
  },
  part: {
    display: 'flex',
    color: theme.palette.common.grey,
    alignItems: 'center',
    cursor: 'pointer'
  },
  separator: {
    height: 16
  }
});

export default BreadcrumbStyles;
