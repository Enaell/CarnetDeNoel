import {connect} from 'react-redux';
import NavSnackBar from './NavSnackBar';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});


function mapStateToProps(state){
  return {
    open: state.navSnackBar.open,
    variant: state.navSnackBar.variant,
    message: state.navSnackBar.message
  }
}

function mapDispatchToProps(dispatch){
  return {
    closeSnackBar: () => {
      dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withStyles(styles) (NavSnackBar))