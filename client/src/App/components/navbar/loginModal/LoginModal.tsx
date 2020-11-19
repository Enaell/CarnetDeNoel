import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {LoginTabs} from '../../login/LoginTabs'; 
import translate from 'counterpart';

type LoginModalType = {
  onLogin: any,
  onSignin: any,
  closeModal: any,
  open: boolean,
  tabNumber: number,
  changeTabNumber: (num: number) => void
}

const LoginModal = ({onLogin, onSignin, closeModal, open, tabNumber, changeTabNumber} : LoginModalType) => {

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

  const onSigninClick = () => {

    const usError = !username;
    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));

    setUsernameError(usError);
    setPasswordError(pError);
    setEmailAddressError(eaError);

    if (!(usError || pError || eaError))
      onSignin(username, emailAddress, password);
  }

  const onLoginClick = () => {

    const pError =  !password;
    const eaError = !(emailAddress && emailAddress.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmailAddressError(eaError);
    setPasswordError(pError);

    if (!(pError || eaError))
      onLogin(emailAddress, password);
  }

  function handleTabChange(event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
    setEmailAddressError(false);
    changeTabNumber(newValue);
  }


  return (
    <div>
      <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
        <form>
          <DialogContent>
            <LoginTabs
                tabNumber={tabNumber}
                handleTabChange={handleTabChange} 
                handleEmailChange={handleEmailChange} 
                handlePasswordChange={handlePasswordChange}
                passwordError={passwordError} 
                emailAddressError={emailAddressError} 
                usernameError={usernameError}
                handleUserNameChange={handleUserNameChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Cancel
            </Button>
            {tabNumber === 0 && 
            <Button type='submit' onClick={(e)=>{e.preventDefault(); onSigninClick()}} color="primary">
              {translate('connection.signin')}
            </Button>}
            {tabNumber === 1 && 
            <Button type='submit' onClick={(e)=>{e.preventDefault(); onLoginClick()}} color="primary">
              {translate('connection.login')}
            </Button>}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default LoginModal;
