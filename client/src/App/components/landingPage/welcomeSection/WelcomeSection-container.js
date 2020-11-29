import { connect } from 'react-redux';
import { WelcomeSection } from './WelcomeSection';

function mapStateToProps(state){
  return {
    tabNumber: state.loginModal.tab,
    user: state.user,
    isLogged: state.user && (state.user.token || (state.user.language && state.user.targetLanguage))
  }
}

function mapDispatchToProps(dispatch){
  return({
    onLogin:(username, password) => {
      const loginBody = { user: { "username":username,"password":password }};
      return fetch("http://localhost:5000/api/users/login",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loginBody)
        })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error){
            dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Login Error !"}});
            dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
          }
          else
          {
            dispatch({type: 'LOGIN', payload: json.user});
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Login Error !"}});
          dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
        });
    },
    onSignin:(username, password, language, targetLanguage) => {
      const signinBody =  {
        'user': {
          "username": username,
          "password": password,
          "language": language,
          "targetLanguage": targetLanguage,
          "levels": [
            {"language": language, "rank": 6},
            {"language": targetLanguage, "rank": 1}
          ]
        }
      };
      return fetch("http://localhost:5000/api/users",
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(signinBody)
        })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.error){
            dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Signin Error !"}});
            dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
          }
          else
          {
            dispatch({type: 'LOGIN', payload: json.user});
          }
        })
        .catch((e) => {
          console.log(e);
          dispatch({type: 'SET_NAV_SNACKBAR', payload: {variant: 'error', message: "Signin Error !"}});
          dispatch({type: 'TOGGLE_NAV_SNACKBAR'})
        });
    },
    changeTabNumber:(tabNumber) =>{
      dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: tabNumber});
    },
  })
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeSection)