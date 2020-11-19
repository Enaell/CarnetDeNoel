import { connect } from 'react-redux';
import UserBar from './UserBar';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

function mapStateToProps(state){
  return{
      user: state.user,
  }
}

function mapDispatchToProps(dispatch){
  return{
    onLogout:(token) => {
      // fetch("http://localhost:3000/api/customers/logout?access_token=" + token,
      // {
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     method: "POST",
      //     // body: JSON.stringify(signinBody)
      // })
      // .then(() => 
      dispatch({type:'LOGOUT'})
      // .catch((e) => {
      //   console.log(e);
      //   dispatch({type:'LOGOUT'});
      // })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles) (UserBar));