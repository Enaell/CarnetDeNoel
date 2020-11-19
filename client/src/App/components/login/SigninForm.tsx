import React from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';

type SigninFormType = {
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handleUserNameChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, 
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  passwordError: boolean, 
  usernameError: boolean, 
  emailAddressError: boolean,
};

export const SigninForm = ({
  handleEmailChange, 
  handleUserNameChange, 
  handlePasswordChange,
  passwordError, 
  usernameError, 
  emailAddressError,
}: SigninFormType) => {
  
  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%', paddingBottom: '10px'}}>
      <TextField
        error = {usernameError}
        helperText = {usernameError ? translate('connection.usernameError') : null}       
        required
        margin="dense"
        id="name"
        label={translate('connection.username')}
        type="text"
        onChange={handleUserNameChange}
        fullWidth
      />
      <TextField
        error = {emailAddressError}
        helperText = {emailAddressError ? translate('connection.emailError') : null} 
        required
        margin="dense"
        id="email"
        label={translate('connection.email')}
        type="email"
        onChange={handleEmailChange}
        fullWidth
      />
      <TextField
        error = {passwordError}
        helperText = {passwordError ? translate('connection.passwordError') : null}
        required
        margin="dense"
        id="password"
        label={translate('connection.password')}
        type="password"
        onChange={handlePasswordChange}
        fullWidth
      />
    </Column>
  );
}