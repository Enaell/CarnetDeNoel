import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, makeStyles, Theme } from '@material-ui/core';
import LoginModal from './loginModal';
import NavSnackBar from './navSnackBar';
import UserBar from './userBar'
import translate from 'counterpart';
import { UserType } from '../common/types';
import { useSelector, useDispatch } from 'react-redux';
import { Row } from '../common/Flexbox';
import { withRouter } from 'react-router-dom';

type NavbarType = {
  history: any
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 9999,
    width: '100%',
  },
  grow: {
    flex: 1
  },
  grow3: {
    flex:3
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  homeButton:{
    textTransform: 'none',
  }
}));

export const Navbar = withRouter(({
  history
}: NavbarType) => {

  const handleSideMenuClick = () => {}

  const user = useSelector((state: any) => state.user) as UserType;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOnMainPageRedirectionClick = () => {
    history.push('/');
  }

  const openLoginModal = () => {
    dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 2})
    dispatch({type: 'TOGGLE_LOGIN_MODAL'})
  }

  const openSigninModal = () => {
    dispatch({type: 'CHANGE_LOGIN_MODAL_TAB', payload: 1})
    dispatch({type: 'TOGGLE_LOGIN_MODAL'})
  }

   return(
    <div className={classes.root}>
      <AppBar elevation={(user.token)? 4: 0} position='fixed' color={ (user.token) ? 'primary' : 'transparent'}>
        <Toolbar>
          <Row width='100%' vertical='center' horizontal='space-between'>
            <Row  className={classes.grow}>
              {user.token &&
              <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="primary" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>}
              <Button className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
                <Typography color={ (user.token) ? 'inherit' : 'primary'} style={ user.token ? {color: 'white'} : {}} variant="h6" noWrap>
                  {translate('application-name')}
                </Typography>
              </Button>
            </Row>
            <Row className={classes.grow}>
            </Row>
            <Row horizontal='end' className={classes.grow}>
              {user.token ? <UserBar/>
              : <>
                  <Button color='primary' onClick={openSigninModal}>
                    <Typography variant='body2' color={'primary'} noWrap>
                      {translate('connection.signin')}
                    </Typography>
                  </Button>
                  <Button color="primary" onClick={openLoginModal}>
                    <Typography variant='body2' color={'primary'} noWrap>
                      {translate('connection.login')}
                    </Typography>
                  </Button>
                  <LoginModal/>
                </>
              }
            </Row>
          </Row>
        </Toolbar>
      </AppBar>
      <NavSnackBar></NavSnackBar>
    </div>
  );
})

