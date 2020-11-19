import React, { useState } from 'react';
import { useHistory } from 'react-router'
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import { welcomeSection, backgroundImg, connectionDiv } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../../login/LoginTabs';
import { IntroductionColumn } from './IntroductionColumn';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '../../common/Buttons';

type WelcomeSectionType = {
  onLogin: (emailAddress: string, password: string) => Promise<void>, 
  onSignin: (username: string, emailAddress: string, password: string) => Promise<void>,
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
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [emailAddressError, setEmailAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);


  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUsername(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setEmailAddress(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setPassword(event.target.value);
  }
  
  const onSigninClick = async() => {
    const usError = !username;
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));

    setUsernameError(usError);
    setPasswordError(pError);
    setEmailAddressError(eaError);

    if (!(usError || pError || eaError))
      {
        await onSignin(username, emailAddress, password);
        history.replace('/notebook/gifts')
      }
  };

  const onLoginClick = async() => {
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmailAddressError(eaError);
    setPasswordError(pError);

    if (!(pError || eaError)) {
      await onLogin(emailAddress, password);
      history.replace('/notebook/gifts');
    }
  };

  function handleTabChange(_event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    setEmailAddressError(false);
    changeTabNumber(newValue);
  }

  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={backgroundImg}/>
      <Column horizontal='end' width='45%'>
        <Column horizontal={'start'} style={ connectionDiv }>
          <Typography  style={{fontWeight : 'bold'}} color="secondary" variant='h2' noWrap>
            {translate('application-name')}
          </Typography>
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row width='100%' height='100%' vertical={'center'}>
              <Column height='100%' width='100%' vertical={'space-around'}>
                <IntroductionColumn />
                <LoginTabs
                  tabNumber={tabNumber}
                  handleTabChange={handleTabChange} 
                  handleEmailChange={handleEmailChange} 
                  handlePasswordChange={handlePasswordChange}
                  passwordError={passwordError} 
                  emailAddressError={emailAddressError} 
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
