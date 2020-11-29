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
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setUsername(event.target.value);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    setPassword(event.target.value);
  }

  const onSigninClick = () => {

    const usError = !username;
    const pError =  !password;

    setUsernameError(usError);
    setPasswordError(pError);

    if (!(usError || pError))
      onSignin(username, password);
  }

  const onLoginClick = () => {

    const pError =  !password;
    const usError = !username;

    setUsernameError(usError);
    setPasswordError(pError);

    if (!(pError || usernameError))
      onLogin(username, password);
  }

  function handleTabChange(event: any, newValue: number){
    setUsernameError(false);
    setPasswordError(false);
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
                handlePasswordChange={handlePasswordChange}
                passwordError={passwordError} 
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
