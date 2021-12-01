import React, { useState } from 'react';
import { useHistory } from 'react-router'
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import { welcomeSection, backgroundImg, connectionDiv, connectionDivMobile, backgroundImgMobile } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../../login/LoginTabs';
import { IntroductionColumn } from './IntroductionColumn';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../common/Buttons';
import { isMobile } from 'react-device-detect';

type WelcomeSectionType = {
  onLogin: (username: string, password: string) => Promise<void>, 
  onSignin: (username: string, password: string) => Promise<void>,
  tabNumber: number,
  changeTabNumber: (num: number) => void,
  position?: 'absolute' | 'relative'
}

export const WelcomeSection = ({ 
  onLogin,
  onSignin,
  tabNumber,
  changeTabNumber,
  position = 'relative'
} : WelcomeSectionType) => {

  const dispatch = useDispatch();
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  function handleUserNameChange(value: string){
    setUsername(value);
  }

  // function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setPassword(event.target.value);
  }
  
  const onSigninClick = async() => {
    const usError = !username;
    const pError =  !password;

    setUsernameError(usError);
    setPasswordError(pError);

    if (!(usError || pError))
    {
      await onSignin(username, password);
      history.replace('/notebook/gifts')
    }
  };

  const onLoginClick = async() => {
    const pError =  !password;
    const usError = !username;
    setUsernameError(usError);
    setPasswordError(pError);

    if (!(pError || usError)) {
    {
      await onLogin(username, password);
      history.replace('/notebook/gifts');}
    }
  };

  function handleTabChange(_event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    changeTabNumber(newValue);
  }

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={isMobile ? backgroundImgMobile : backgroundImg}/>
      <Column horizontal={isMobile ? 'center' : 'end'} width={ isMobile ? '100%' : '45%'}>
        <Column horizontal={'start'} style={ isMobile ? connectionDivMobile : connectionDiv }>
          <Typography  style={{fontWeight : 'bold'}} align={ isMobile ? 'center': 'inherit' } color="secondary" variant='h2' noWrap={!isMobile}>
            {translate('application-name')}
          </Typography>
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row width='100%' height='100%' vertical={'center'}>
              <Column height='100%' width='100%' vertical={'space-around'}>
                { !isMobile && <IntroductionColumn /> }
                <LoginTabs
                  tabNumber={tabNumber}
                  handleTabChange={handleTabChange} 
                  handlePasswordChange={handlePasswordChange}
                  passwordError={passwordError} 
                  usernameError={usernameError}
                  handleUserNameChange={handleUserNameChange}
                  visitorOption
                  orientation='vertical'
                  style={{marginLeft: '-20px'}}
                >
                  <Row horizontal='space-around' style={{width: '100%', paddingTop: '10px'}}>
                    {tabNumber === 0 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onSigninClick}> {translate('connection.signin')}</LoadingButton>}
                    {tabNumber === 1 && 
                    <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onLoginClick}> {translate('connection.login')}</LoadingButton>}
                  </Row>
                </LoginTabs>
              </Column>
            </Row>
          </form>
        </Column>
      </Column>
    </Column>
  );
}
